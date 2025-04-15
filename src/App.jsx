import Lines from "./components/Lines";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useState } from "react";
import PlayerStats from "./components/PlayerStats";

const lines = [
  "https://api.linemate.io/api/nba/v1/discovery/cards?premium=true",
  "https://api.linemate.io/api/nba/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_RECENT_FORM&premium=true",
  "https://api.linemate.io/api/nba/v1/discovery/cards?cardGroup=ALTERNATES&premium=true",
  "https://api.linemate.io/api/nba/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_ALTERNATES&premium=true",
  "https://api.linemate.io/api/nba/v1/discovery/cards?cardGroup=RISKY&premium=true",
];

const App = () => {
  const [player, setPlayer] = useState({
    player: {
      player: {
        SRGUID: "",
      },
    },
  });

  const [line, setLine] = useState(3);

  return (
    <div className="text-white bg-gray-800">
      <Nav setLine={setLine} />
      <div className="flex">
        <Lines url={lines[line]} playerChange={setPlayer} />
        {/* <PlayerStats player={player.player.SRGUID} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
