import { createContext, useState } from "react";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [buffer, setBuffer] = useState(true);
  const [auth, setAuth] = useState(false);

  return (
    <User.Provider
      value={{
        user,
        setUser,
        buffer,
        setBuffer,
        auth,
        setAuth,
      }}
    >
      {children}
    </User.Provider>
  );
};
