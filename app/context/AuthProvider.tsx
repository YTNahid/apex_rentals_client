import React from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const contextValue = {};

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
