import React, { useState } from "react";
import Navigation from "./frontend/components/Navigation";
import Recents from "./frontend/components/Recents";
import Lines from "./frontend/components/Lines";
import Login from "./frontend/components/Login";
import Builder from "./frontend/components/Builder";
import Home from "./frontend/components/Home";

const App = () => {
  const [step, setStep] = useState("home");
  const [league, setLeague] = useState("nba");

  return (
    <>
      <Navigation setStep={setStep} league={league} setLeague={setLeague} />
      <div className="p-3 text-light">
        {step === "home" && <Home />}
        {step === "recents" && <Recents />}
        {step === "lines" && <Lines league={league}/>}
        {step === "builder" && <Builder />}
        {step === "login" && <Login />}
      </div>
    </>
  );
};

export default App;
