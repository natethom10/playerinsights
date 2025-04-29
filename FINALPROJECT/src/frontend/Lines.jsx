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
  const [totalParlays, setTotalParlays] = useState([]);
  const [singleParlay, setSingleParlay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData([]);
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

  const handleAddToSlip = (item) => {
    let alreadyAdded = false;
    console.log(item);
    singleParlay.forEach((checked) => {
      if (checked._id === item._id || checked.description === item.description)
        alreadyAdded = true;
    });

    if (!alreadyAdded) setSingleParlay((prevItems) => [...prevItems, item]);
  };

  const handleRemoveFromSlip = (item) => {
    let copy = singleParlay;
    copy = copy.filter((checked) => checked._id !== item._id);
    setSingleParlay(copy);
  };

  const handleSaveParlay = () => {
    setTotalParlays((prevItems) => [...prevItems, singleParlay]);
    setSingleParlay([]);
  };

  const handleDeleteParlay = (parlay) => {
    let copy = totalParlays;
    copy = copy.filter((checked) => {
      if (parlay.length !== checked.length) return true;

      for (let i = 0; i < checked.length; i++) {
        if (checked[i].description !== parlay[i].description) return true;
      }

      return false;
    });

    setTotalParlays(copy);
  };

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="flex flex-col items-center col-span-3">
          <Dropdown setUrl={setUrl} />
          {loading && <h1>No data...</h1>}
          <div className="flex flex-wrap justify-center gap-2">
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
                      {item.type === "player" ? (
                        <div className="flex justify-between">
                          <div className="flex gap-1">
                            <div>{item.player.fullName}</div>
                            <div>{item.player.position}</div>
                          </div>
                          <div>{item.team.code}</div>
                        </div>
                      ) : (
                        item.team.city + " " + item.team.name
                      )}
                    </h1>
                    <h1 className="text-green-400 font-bold">
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
                    <div className="flex justify-end mt-2">
                      <button
                        className="border p-1 rounded-md"
                        onClick={() => handleAddToSlip(item)}
                      >
                        Add To Slip
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <div className="text-center">
            <h1>Current Parlay:</h1>
          </div>
          <div className="border flex flex-col items-center">
            {singleParlay.map((item, index) => {
              return (
                <div
                  className="p-2 flex w-[100%] justify-between p-3"
                  key={index}
                >
                  <div>
                    {item.type === "player" ? (
                      <div className="flex gap-1">
                        <div className="flex gap-1">
                          <div>{item.player.fullName}</div>
                          <div>{item.player.position}</div>
                        </div>
                        <div>{item.team.code}</div>
                      </div>
                    ) : (
                      item.team.city + " " + item.team.name
                    )}
                    <h1 className="text-green-400 font-bold">
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
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="border p-1 rounded-md"
                      onClick={() => handleRemoveFromSlip(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col items-center w-[100%]">
              <div className="flex items-center">
                <div className="p-1">$10 profits</div>
                <div>
                  $
                  {(
                    singleParlay.reduce((accumulator, item) => {
                      const odds =
                        item.alternate === false
                          ? item.market.books[item.book][item.outcome].current
                              .odds.american
                          : item.market.books[item.book][item.outcome]
                              .alternates[item.line].odds.american;

                      const decimal =
                        odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1;
                      return accumulator * decimal;
                    }, 1) *
                      10 -
                    10
                  ).toFixed(2)}
                </div>
              </div>
              <div>
                <button
                  className="border p-1 rounded-md mb-1"
                  onClick={handleSaveParlay}
                >
                  Save Parlay
                </button>
              </div>
            </div>
          </div>
          <div className="text-center my-1">Saved Parlays</div>
          <div className="flex flex-col gap-2">
            {totalParlays.map((item, index) => {
              console.log(item);
              return (
                <div className="border p-2 w-[100%]" key={index}>
                  {item.map((pick, index) => {
                    return (
                      <div key={index}>
                        {pick.type === "player" ? (
                          <div className="flex gap-1">
                            <div className="flex gap-1">
                              <div>{pick.player.fullName}</div>
                              <div>{pick.player.position}</div>
                            </div>
                            <div>{pick.team.code}</div>
                          </div>
                        ) : (
                          pick.team.city + " " + pick.team.name
                        )}
                        <h1 className="text-gray-400">
                          {pick.outcome} {pick.line} {values[pick.market.name]}{" "}
                          {(() => {
                            const odds =
                              pick.alternate === false
                                ? pick.market.books[pick.book][pick.outcome]
                                    .current.odds.american
                                : pick.market.books[pick.book][pick.outcome]
                                    .alternates[pick.line].odds.american;
                            return odds > 100 ? `+${odds}` : odds;
                          })()}
                        </h1>
                      </div>
                    );
                  })}
                  <div className="flex w-[100%] justify-between">
                    <div className="flex items-center gap-1">
                      <div>$10 profits</div>
                      <div>
                        $
                        {(
                          item.reduce((accumulator, pick) => {
                            const odds =
                              pick.alternate === false
                                ? pick.market.books[pick.book][pick.outcome]
                                    .current.odds.american
                                : pick.market.books[pick.book][pick.outcome]
                                    .alternates[pick.line].odds.american;

                            const decimal =
                              odds > 0
                                ? odds / 100 + 1
                                : 100 / Math.abs(odds) + 1;
                            return accumulator * decimal;
                          }, 1) *
                            10 -
                          10
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <button
                        className="border rounded-md mb-1"
                        onClick={() => handleDeleteParlay(item)}
                      >
                        Delete Parlay
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lines;
