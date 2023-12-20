import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3cJHvSFXOC-UyE7UDJwaaEsXPVKcHMEc",
  authDomain: "video-7909b.firebaseapp.com",
  projectId: "video-7909b",
  storageBucket: "video-7909b.appspot.com",
  messagingSenderId: "970630308540",
  appId: "1:970630308540:web:8a7b608a13848604e0a6b9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
