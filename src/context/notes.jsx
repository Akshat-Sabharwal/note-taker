import { createContext, useState } from "react";

export const Notes = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(null);
  const [buffer, setBuffer] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  return (
    <Notes.Provider
      value={{
        notes,
        setNotes,
        buffer,
        setBuffer,
        fetchError,
        setFetchError,
      }}
    >
      {children}
    </Notes.Provider>
  );
};
