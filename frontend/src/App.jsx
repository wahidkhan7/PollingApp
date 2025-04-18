import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./pages/Auth/LoginForm.jsx";
import Bookmarks from "./pages/Dashboard/Bookmarks.jsx"
import SignUpForm from "./pages/Auth/SignUpForm.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import CreatePoll from "./pages/Dashboard/CreatePoll.jsx";
import MyPolls from "./pages/Dashboard/MyPolls.jsx";
import VotedPolls from "./pages/Dashboard/VotedPolls.jsx";
import {UserProvider} from "./context/UserContext.jsx";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/Bookmarked" element={<Bookmarks />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/create-poll" element={<CreatePoll />} />
            <Route path="/my-poll" element={<MyPolls />} />
            <Route path="/voted-poll" element={<VotedPolls />} />
            <Route path="/Bookmarked-poll" element={<Bookmarks />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;

//define the root component to handel the intial redirect
const Root = () => {
  //check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
