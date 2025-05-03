// src/context/UserContext.jsx
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [preferences, setPreferences] = useState(null); // Shared preferences (e.g., dietary, fitness goals)
  return (
    <UserContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
