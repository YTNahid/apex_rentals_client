// AuthProvider.tsx
import { useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
  type AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";
import auth from "~/firebase/firebase.init";
import { AuthContext, type AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

// 2. This file now ONLY exports the React component
const AuthProvider = ({ children, initialUser = null }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const userSignUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const userSignIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const userSignInWithProvider = (provider: FirebaseAuthProvider) =>
    signInWithPopup(auth, provider);

  const userUpdateProfile = (data: { displayName?: string | null; photoURL?: string | null }) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, data);
  };

  const userSignOut = () => signOut(auth);

  const userResetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    userSignUp,
    userSignIn,
    userSignOut,
    userSignInWithProvider,
    userUpdateProfile,
    userResetPassword,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
