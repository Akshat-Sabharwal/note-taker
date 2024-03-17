import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../src/pages/home/Home";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Note } from "./pages/note/Note";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} index={true} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path={`/dashboard/:noteId`} element={<Note />} />
      </Routes>
    </BrowserRouter>
  );
};
