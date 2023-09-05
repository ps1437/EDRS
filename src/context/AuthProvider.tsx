import React from "react";

export const AuthContext = React.createContext<ReturnType<typeof useAuthHook> | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={useAuthHook()}>
    {children}
  </AuthContext.Provider>
}

function useAuthHook(){
  return {
    "name": localStorage.getItem("username"),
    "token":localStorage.getItem("token")
  }
}



