import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const values = {
  POINTS: "PTS",
  POINTS_1Q: "1st Q PTS",
  ASSISTS: "AST",
  ASSISTS_1Q: "1st Q AST",
  REBOUNDS: "REB",
  REBOUNDS_1Q: "1st Q REB",
  TURNOVERS: "TO",
  THREE_POINTS_MADE: "THREES",
  BLOCKS: "BLK",
  STEALS: "STL",
  POINTS_PLUS_REBOUNDS: "PTS/REB",
  POINTS_PLUS_ASSISTS: "PTS/AST",
  POINTS_PLUS_ASSISTS_PLUS_REBOUNDS: "PTS/REB/AST",
  ASSISTS_PLUS_REBOUNDS: "REB/AST",
  STEALS_PLUS_BLOCKS: "STL/BLK",
  HITTER_SINGLES: "SINGLES",
  HITTER_RUNS: "RUNS",
  HITTER_HITS: "HITS",
  HITTER_HITS_PLUS_RUNS_PLUS_RUNS_BATTED_IN: "HITS/RUN/RBI",
  HITTER_STOLEN_BASES: "SB",
  HITTER_RUNS_BATTED_IN: "RBI",
  HITTER_DOUBLES: "DOUBLES",
  PITCHER_EARNED_RUNS: "ERA",
  HITTER_TOTAL_BASES: "TOTAL BASE",
  HITTER_TRIPLES: "TRIPLES",
  MONEY_LINE_1Q: "1Q ML",
  MONEY_LINE_1H: "1H ML",
  SPREAD_1H: "1H SPREAD",
  TEAM_TOTAL: "TEAM PTS",
  SPREAD_1Q: "1Q SPREAD",
  SPREAD: "SPREAD",
  GAME_TOTAL: "GAME PTS",
  GAME_TOTAL_1Q: "1Q PTS",
  MONEY_LINE: "ML",
  PITCHER_HITS_ALLOWED: "HITS ALLOWED",
  PITCHER_STRIKEOUTS: "STRIKEOUTS",
  PITCHER_OUTS: "PITCHER OUTS",
  HITTER_HOME_RUNS: "HRS",
  GAME_TOTAL_FIRST_5_INNINGS: "FIRST 5 TOTAL",
  SPREAD_FIRST_5_INNINGS: "FIRST 5 SPREAD",
};

const dropdownValues = {
  0: "Base Lines",
  1: "Perfect Base Lines",
  2: "Alternate Lines",
  3: "Perfect Alternate Lines",
  4: "Risky",
};

const collections = [
  "MLBbaselines",
  "MLBperfectbaselines",
  null,
  null,
  "MLBrisky",
  "NBAbaselines",
  "NBAperfectbaselines",
  "NBAaltlines",
  "NBAperfectaltlines",
  "NBArisky",
  "higherchances",
  "alldata",
];

const leagueValues = {
  nba: 5,
  mlb: 0,
};

const Lines = ({ league }) => {
  const [url, setUrl] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      navigate(`/${league}/lines`);

      try {
        const response = await fetch(
          `http://localhost:8080/${collections[leagueValues[league] + url]}`
        );
        if (!response.ok) {
          console.error("Something wrong with gathering line data.");
          return;
        }

        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [url, league]);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <Dropdown setUrl={setUrl} />
          <div className="w-[50vw] flex flex-wrap justify-center gap-2">
            {data
              .filter((item) => {
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const compare = `${year}${
                  month < 10 ? "0" + month : month
                }${day}`;
                return item.gameId.split("-")[0] === compare;
              })
              .map((item, index) => {
                return (
                  <div className="border w-[288px] p-3" key={index}>
                    <h1>
                      {item.type === "player"
                        ? item.player.fullName +
                          " " +
                          item.player.position +
                          " " +
                          item.team.code
                        : item.team.city + " " + item.team.name}
                    </h1>
                    <h1 className="text-green-400">
                      {item.outcome} {item.line} {values[item.market.name]}{" "}
                      {(() => {
                        const odds =
                          item.alternate === false
                            ? item.market.books[item.book][item.outcome].current
                                .odds.american
                            : item.market.books[item.book][item.outcome]
                                .alternates[item.line].odds.american;
                        return odds > 100 ? `+${odds}` : odds;
                      })()}
                    </h1>
                    {item.insights.map((insight, index) => {
                      return <h1 key={index}>{insight.description}</h1>;
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="text-center">
          Saved Parlays
        </div>
      </div>
    </>
  );
};

export default Lines;
