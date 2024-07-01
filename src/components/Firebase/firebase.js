import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe6Jh73GEl9D8nOyoKQj4q7MRiQcOJMhY",
  authDomain: "job-application-tracker-b75a0.firebaseapp.com",
  projectId: "job-application-tracker-b75a0",
  storageBucket: "job-application-tracker-b75a0.appspot.com",
  messagingSenderId: "532296670653",
  appId: "1:532296670653:web:5ba92ffe43d566460446d4",
  measurementId: "G-84Z4SEQ70G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

/**
 * Fetch applications from Firestore
 * @returns {Promise<Array>} List of applications
 */
const fetchApplications = async () => {
  const applicationsCollection = collection(db, 'applications');

  try {
    const snapshot = await getDocs(applicationsCollection);
    let applications = [];
    snapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log('Applications:', applications);
    return applications; // Optionally return applications array
  } catch (err) {
    console.error('Error getting documents:', err);
    throw err; // Propagate the error if necessary
  }
};

export { auth, db, app, fetchApplications };
