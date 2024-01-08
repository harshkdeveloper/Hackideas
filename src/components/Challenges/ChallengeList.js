import React, { useState, useEffect } from "react";
import { database } from "../../config/firebase-config";
import {
  collection,
  query,
  getDocs,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { BsHandThumbsUp } from "react-icons/bs";
import Loader from "../Loader/Loader";
import "./challenge.css";
import { Pagination } from "../../pagination/Pagination";
import Sidenavbar from "../Navbar/Sidenavbar";

const ChallengeList = ({ setIsLoggedIn }) => {
  const [entries, setEntries] = useState([]);
  const employeeId = localStorage.getItem("employeeId");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("");
  const [entriesPerPage] = useState(3);
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userDocRef = doc(database, "users", employeeId); 
        const entriesCollectionRef = collection(userDocRef, "entries");
        const q = query(entriesCollectionRef);
        const querySnapshot = await getDocs(q);

        const fetchedEntries = [];
        querySnapshot.forEach((doc) => {
          fetchedEntries.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    fetchEntries();
  }, [employeeId]);
  useEffect(() => {
    setEntries((prevEntries) => {
   

      return [...prevEntries].sort((a, b) => {
        if (sortCriteria === "upvotes") {
          return b.upvotes - a.upvotes;
        } else {

          return (
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
          );
        }
      });
    });
  }, [sortCriteria]);
  const incrementUpvote = async (entryId) => {
    console.log(entryId);
    const entryRef = doc(database, "users", employeeId, "entries", entryId);
    await updateDoc(entryRef, {
      upvotes: increment(1),
    });


    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId
          ? { ...entry, upvotes: (entry.upvotes || 0) + 1 }
          : entry
      )
    );
  };
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        background:
          " linear-gradient(106.5deg, rgba(255, 215, 185, 0.91) 23%, rgba(223, 159, 247, 0.8) 93%)",
      }}
    >
      <Sidenavbar
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        loginvalue={setIsLoggedIn}
      />
      <div className="flex-grow-1 p-3">
        <div className="main-content">
          <div className="container mb-4">
            <div className="row">
              {loading === false ? (
                currentEntries.map((entry) => (
                  <div className="col-md-4 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        {/* <li key={entry.id}> */}
                        <h5 className="card-title text-center">
                          {entry.title}
                        </h5>
                        <p className="card-text text-center">
                          {entry.description}
                        </p>
                        <div className="text-center mb-2">
                          {entry.selectedTags.map((tag, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary me-1"
                            >
                              {tag}
                            </span>
                          ))}

                          {/* </div> */}
                        </div>
                      
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          {entry.creationDate}
                        </small>
                        <button
                          className="btn float-end"
                          onClick={() => incrementUpvote(entry.id)}
                          style={{ background: "none", border: "none" }}
                        >
                          <BsHandThumbsUp
                            color={entry.upvoted ? "#007bff" : "grey"}
                          />
                          <span className="ms-2">{entry.upvotes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
            {
            currentEntries.length<=0&&loading===false&&
            <div>No hack idea found<spam>please add a challenge</spam></div>
          }
          </div>
          <Pagination
            entriesPerPage={entriesPerPage}
            totalEntries={entries.length}
            paginate={paginate}
          />
      
        </div>
      </div>
    </div>
  );
};

export default ChallengeList;
