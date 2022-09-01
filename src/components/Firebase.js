// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyCoTq_QmMWiz-xic17lZ_xWBESuT8k0ShA",
  authDomain: "instagram-clone-react-cd6b2.firebaseapp.com",
  projectId: "instagram-clone-react-cd6b2",
  storageBucket: "instagram-clone-react-cd6b2.appspot.com",
  messagingSenderId: "942425799142",
  appId: "1:942425799142:web:d821dc962d51130d193e27",
};
// Initialize

const app = initializeApp(firebaseConfig);

// Initialize Firebastore

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// getting data

const storiesData = collection(db, "stories");

const posts = collection(db, `posts`);
const msg = collection(db, `message`);

// const auths = firebase.auth();
// const storage = firebase.storage();

export { db, auth, posts, storiesData, storage, msg };

// const analytics = getAnalytics(app);
