// AuthContext.ts
import { createContext } from "react";
import type { 
  User, 
  UserCredential, 
  AuthProvider as FirebaseAuthProvider 
} from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  userSignUp: (email: string, password: string) => Promise<UserCredential>;
  userSignIn: (email: string, password: string) => Promise<UserCredential>;
  userSignInWithProvider: (provider: FirebaseAuthProvider) => Promise<UserCredential>;
  userUpdateProfile: (data: {
    displayName?: string | null;
    photoURL?: string | null;
  }) => Promise<void>;
  userSignOut: () => Promise<void>;
  userResetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);