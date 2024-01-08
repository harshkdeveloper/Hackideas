import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  
    apiKey: "AIzaSyCncoUbJ-2oGu8N2_p0Rjvn4KzcTy-jCvM",
    authDomain: "hack-ideas-a7bdf.firebaseapp.com",
    projectId: "hack-ideas-a7bdf",
    storageBucket: "hack-ideas-a7bdf.appspot.com",
    messagingSenderId: "325982987508",
    appId: "1:325982987508:web:288fd6659785e6dba2eaa1",
    measurementId: "G-GJ985H0NBC"
  
};

export const app=initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getFirestore(app); 
