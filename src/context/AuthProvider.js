import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [user, setUser] = useState(null);
  // registration starting
  const createUserEmail = (email, password) => {
    setLoadingState(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // registration ending
  // update starting
  const updateUser = (info) => {
    setLoadingState(true)
    return updateProfile(auth.currentUser, info)
  }
  // update ending
  // google login starting
  const googleLogin = () => {
    setLoadingState(true)
    return signInWithPopup(auth, googleProvider)
  }
  // google login ending
  // login starting
  const emailLogin = (email, password) => {
    setLoadingState(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // login ending
  // logout starting
  const logOut = () => {
    localStorage.removeItem('furniture')
    return signOut(auth)
  }
  // logout ending
  // get currently signed in user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingState(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loadingState,
    setLoadingState,
    user,
    setUser,
    createUserEmail,
    updateUser,
    googleLogin,
    emailLogin,
    logOut
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
