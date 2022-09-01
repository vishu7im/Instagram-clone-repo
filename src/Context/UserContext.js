import { createContext, useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../components/Firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState();

  const logout = () => {
    return signOut(auth);
  };

  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });

  const GoogleSignIN = () => {
    const provider = new GoogleAuthProvider();
    const login = signInWithPopup(auth, provider);
  };

  return (
    <UserContext.Provider value={{ user, logout, GoogleSignIN }}>
      {children}
    </UserContext.Provider>
  );
};

export const AuthContext = () => {
  return useContext(UserContext);
};
