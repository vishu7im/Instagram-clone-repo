import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../components/Firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState();

  const createuser = (email, pwd) => {
    return createUserWithEmailAndPassword(auth, email, pwd);
  };
  const loginuser = (email, pwd) => {
    return signInWithEmailAndPassword(auth, email, pwd);
  };

  const logout = () => {
    return signOut(auth);
  };

  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });

  return (
    <UserContext.Provider value={{ createuser, loginuser, user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const AuthContext = () => {
  return useContext(UserContext);
};
