import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut,   } from "firebase/auth";
import auth from "./../firebase/firebase.config";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const newUser = (email, password) => {
    setLoader(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const createSignIn=(email,password)=>{
    setLoader(true)
   return signInWithEmailAndPassword(auth, email, password)
  };
  
  const createSignOut=()=>{
    setLoader(true)
    return signOut(auth)
  };
  

  const userInfo = {
    user,
    loader,
    newUser,
    createSignIn,
    createSignOut,
    
   
  };
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        console.log(currentUser)
        setUser(currentUser)
        setLoader(false)
    });
    return()=>unsubscribe;

  },[])
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
