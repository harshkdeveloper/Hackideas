import React, { useState } from "react";
import Sidenavbar from "../Navbar/Sidenavbar";
import Navbar from "../Navbar/Navbar";
import { database } from '../../config/firebase-config'
import { doc, setDoc,collection, addDoc  } from 'firebase/firestore';
import useFormValidation from "../../Customhooks/useFormValidation";

const tagslist = ["React Js", "Angular Js", "Vue Js", "Next Js"];
const AddChallenges = ({setIsLoggedIn}) => {
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [touched,setTouched]=useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const employeeId=localStorage.getItem('employeeId')
  const creationDate = new Date().toLocaleDateString()
  const upvotes=0;
  const { validate, errors,handleChange } = useFormValidation();
 
  const handleTagChange = (tag, isChecked) => {
    if (isChecked) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    }
    handleChange('tags')
    console.log(selectedTags,'rgrg')
  };

  const AddChallenge = async (event) => {
    event.preventDefault();
    // onSubmit(selectedTags)
    if (!validate(title, description,selectedTags)) return;
    try {
      const userDocRef = doc(database, 'users', employeeId); // Reference to the user document
      const entriesCollectionRef = collection(userDocRef, 'entries'); // Reference to the 'entries' subcollection
      await addDoc(entriesCollectionRef, { selectedTags, description,title,creationDate ,upvotes}); // Add a new entry
      alert('New entry added successfully!');
    } catch (error) {
      console.error('Error adding new entry:', error);
      alert('Error adding new entry');
    }
  };
  console.log(selectedTags,'tags')
  return (
    <>
      <Navbar loginvalue={setIsLoggedIn} />
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh", background:' linear-gradient(106.5deg, rgba(255, 215, 185, 0.91) 23%, rgba(223, 159, 247, 0.8) 93%)' }}
      >
        <Sidenavbar />
        <div className="flex-grow-1 ">
          <div className="container-fluid">
            <form className="mx-auto" style={{ width: "30%" }}onSubmit={AddChallenge}>
              <h4 className="text-center">Add Challenges</h4>
              <div className="mb-3 mt-5">
                <label for="exampleInputEmail1" class="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>{
                    setTitle(e.target.value);
                    handleChange('title');
                  }}
                />
                   {errors.title && <p className="text-danger">{errors.title}</p>}
              </div>
              <div className="mb-2 mt-3">
                <label for="exampleInputEmail1" class="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={description}
                  onChange={(e)=>{
                    setDecription(e.target.value);
                    handleChange('description');
                  }}
                />
                 {errors.description && <p className="text-danger">{errors.description}</p>}
              </div>
              <div className="mb-2 mt-3">
                <label for="exampleInputEmail1" class="form-label">
                  Tags
                </label>
                <br/>
                <div className="form-check form-check-inline">
  {tagslist.map((tag, index) => (
    <div key={index} className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={`inlineCheckbox-${index}`} // Unique ID for each checkbox
        value={tag}
        onChange={(e) => handleTagChange(tag, e.target.checked)}
      />
      <label className="form-check-label" htmlFor={`inlineCheckbox-${index}`}>
        {tag}
      </label>
     
    </div>
  ))}
   {errors.tags && <p className="text-danger">{errors.tags}</p>}
</div>
              </div>
          
              <button type="submit" className="btn btn-primary mt-2">
              Add
              </button>
              
            </form>
          </div>
          {/* Rest of the page content */}
        </div>
      </div>
    </>
  );
};

export default AddChallenges;
