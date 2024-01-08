import { database } from "./firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

export const findUserByUsername = async (employeeId) => {
  const usersRef = collection(database, "users");
  const q = query(usersRef, where("employeeId", "==", employeeId));

  try {
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "queryyy");
    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });
    return userData;
  } catch (error) {
    console.error("Error finding user: ", error);
  }
};
