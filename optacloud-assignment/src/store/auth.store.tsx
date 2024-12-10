import { createContext, useEffect, useState } from "react";

type AuthType = {
  username: string;
  authenticated: boolean;
  setAuth: (auth: { username: string; authenticated: boolean }) => void;
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{
    username: string;
    authenticated: boolean;
  }>({
    username: "",
    authenticated: true,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  function handleSetAuth(auth: { username: string; authenticated: boolean }) {
    setAuth(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  }

  return (
    <AuthContext.Provider
      value={{
        username: auth.username,
        authenticated: auth.authenticated,
        setAuth: handleSetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
