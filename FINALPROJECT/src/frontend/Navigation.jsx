import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ league, setLeague }) => {
  const navigate = useNavigate();
  const handleLeagueChange = (newLeague) => {
    setLeague(newLeague);
    navigate(`${league}/lines`);
  };

  return (
    <nav className="flex justify-between p-2">
      <div>
        <Link to={`/`} className="mr-3 text-xl">
          PlayerInsights
        </Link>
        <button onClick={() => handleLeagueChange('nba')} className="mr-2">NBA</button>
        <button onClick={() => handleLeagueChange('mlb')}>MLB</button>
      </div>
      <div>
        <Link to={`/${league}/recents`} className="mr-3">
          Recents
        </Link>
        <Link to={`/${league}/lines`} className="mr-3">
          Lines
        </Link>
        <Link to={`/builder`} className="mr-3">
          Builder
        </Link>
        <Link to={`/login`}>Login</Link>
      </div>
    </nav>
  );
};

export default Navigation;
