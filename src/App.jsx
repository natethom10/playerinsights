import React, { useState } from "react";
import Navigation from "./frontend/components/Navigation";
import Recents from "./frontend/components/Recents";
import Lines from "./frontend/components/Lines";
import Login from "./frontend/components/Login";
import Builder from "./frontend/components/Builder";
import Home from "./frontend/components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [league, setLeague] = useState("nba");

  return (
    <>
      {/* <Navigation setStep={setStep} league={league} setLeague={setLeague} />
      <div className="p-3 text-light">
        {step === "home" && <Home />}
        {step === "recents" && <Recents />}
        {step === "lines" && <Lines league={league} />}
        {step === "builder" && <Builder />}
        {step === "login" && <Login />}
      </div> */}
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
