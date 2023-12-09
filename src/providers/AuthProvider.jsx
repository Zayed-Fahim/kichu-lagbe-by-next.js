import { auth } from "@/Firebase/firebase.auth";
import AuthContext from "@/contexts/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const values = { user, loading, createUser, setLoading, setUser };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
