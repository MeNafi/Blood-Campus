import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../../firebase.config";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    if (!auth.currentUser) return Promise.resolve();
    return updateProfile(auth.currentUser, { displayName: name });
  };

  const loginWithEmail = async (email, password, rememberMe = true) => {
    setLoading(true);
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
        unsubscribe();
    }
  },[]);

  const authInfo = {
    loading,
    registerWithEmail,
    updateUserProfile,
    user,
    loginWithEmail,
    loginWithGoogle,
    signOutUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;
