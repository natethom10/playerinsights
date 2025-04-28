import React, { useState } from "react";
import Navigation from "./frontend/Navigation";
import Recents from "./frontend/Recents";
import Lines from "./frontend/Lines";
import Login from "./frontend/Login";
import Builder from "./frontend/Builder";
import Home from "./frontend/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [league, setLeague] = useState("nba");

  return (
    <>
      <Router>
        <Navigation league={league} setLeague={setLeague} />
        <div className="p-3 text-light">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:league/recents" element={<Recents />} />
            <Route path="/:league/lines" element={<Lines league={league} />} />
            <Route path="/builder" element={<Builder league={league} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
