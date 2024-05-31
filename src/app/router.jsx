import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Note } from "../pages/note/Note";
import { Login } from "../pages/auth/Login";
import { Signup } from "../pages/auth/Signup";
import { Me } from "../pages/me/Me";
import { Subscriptions } from "../pages/subscription/Subscriptions";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path={`/note/:slug`} element={<Note />} />
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route path="/profile" element={<Me />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </BrowserRouter>
  );
};
