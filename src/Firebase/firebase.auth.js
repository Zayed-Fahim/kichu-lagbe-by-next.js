import app from "./firebase.auth";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();

