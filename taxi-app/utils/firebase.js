import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI2_ZEERjWs1-BvfdwweKlMJM5M90XfJQ",
  authDomain: "hutest1-fb30e.firebaseapp.com",
  databaseURL: "https://hutest1-fb30e-default-rtdb.firebaseio.com",
  projectId: "hutest1-fb30e",
  storageBucket: "hutest1-fb30e.firebasestorage.app",
  messagingSenderId: "181959972229",
  appId: "1:181959972229:web:c6dcea25eb06178507a0ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireStoreDB = getFirestore(app);

export { fireStoreDB };