import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        const whichUrl = collections[leagueValues[league] + url];
        if (whichUrl === null) {
          return (
            <>
              <h1>No data.</h1>
            </>
          );
        }
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

  const dropdown = <></>;

  if (loading) {
    return (
      <div className="d-flex text-center flex-column">
        {dropdown}
        <p>Loading...</p>
      </div>
    );
  } else if (data.length == 0) {
    return (
      <div className="d-flex text-center flex-column">
        {dropdown}
        <p>No data...</p>
      </div>
    );
  }

  return (
    <>
      {dropdown}
      <div className="">
        <div>
          <button onClick={() => setUrl(0)}>1</button>
          <button onClick={() => setUrl(1)}>2</button>
          <button onClick={() => setUrl(2)}>3</button>
          <button onClick={() => setUrl(3)}>4</button>
          <button onClick={() => setUrl(4)}>5</button>
        </div>
        {data
          .filter((item) => {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const compare = `${year}${month < 10 ? "0" + month : month}${day}`;
            return item.gameId.split("-")[0] === compare;
          })
          .map((item, index) => {
            console.log(item);
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
                <h1>
                  {item.outcome} {item.line} {values[item.market.name]}{" "}
                  {item.alternate === false
                    ? item.market.books[item.book][item.outcome].current.odds
                        .american
                    : item.market.books[item.book][item.outcome].alternates[
                        item.line
                      ].odds.american}
                </h1>
                {item.insights.map((insight, index) => {
                  return <h1 key={index}>{insight.description}</h1>;
                })}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Lines;
