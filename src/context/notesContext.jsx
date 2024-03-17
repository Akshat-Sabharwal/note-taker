import { createContext, useState } from "react";

export const NotesData = createContext([]);

export const NotesDataProvider = ({ children }) => {
  const [notesData, setNotesData] = useState([
    {
      heading: "Grocery List",
      description: "All of it to be bought by tomorrow",
      tag: "Basic Needs",
    },
  ]);

  return (
    <NotesData.Provider value={{ notesData, setNotesData }}>
      {children}
    </NotesData.Provider>
  );
};
