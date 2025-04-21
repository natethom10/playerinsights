import React, { useState, useEffect } from "react";
import { Card, Dropdown, ListGroup } from "react-bootstrap";

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
  HITTER_SINGLES: "SINGLE",
  HITTER_RUNS: "RUNS",
  HITTER_HITS: "HITS",
  HITTER_HITS_PLUS_RUNS_PLUS_RUNS_BATTED_IN: "HITS/RUN/RBI",
  HITTER_STOLEN_BASES: "SB",
  HITTER_RUNS_BATTED_IN: "RBI",
  HITTER_DOUBLES: "DOUBLE",
  PITCHER_EARNED_RUNS: "ERA",
  HITTER_TOTAL_BASES: "TOTAL BASE",
  HITTER_TRIPLES: "TRIPLE",
};

const dropdownValues = {
  0: "Base Lines",
  1: "Perfect Base Lines",
  2: "Alternate Lines",
  3: "Perfect Alternate Lines",
  4: "Risky",
};

const Lines = ({ league }) => {
  const urls = [
    `https://api.linemate.io/api/${league}/v1/discovery/cards?premium=true`,
    `https://api.linemate.io/api/${league}/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_RECENT_FORM&premium=true`,
    `https://api.linemate.io/api/${league}/v1/discovery/cards?cardGroup=ALTERNATES&premium=true`,
    `https://api.linemate.io/api/${league}/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_ALTERNATES&premium=true`,
    `https://api.linemate.io/api/${league}/v1/discovery/cards?cardGroup=RISKY&premium=true`,
  ];

  const [url, setUrl] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urls[url]);
        if (!response.ok) {
          console.error("Something wrong with gathering line data.");
          return;
        }

        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url, league]);

  const dropdown = (
    <>
      <Dropdown className="mb-1 d-flex justify-content-center">
        <Dropdown.Toggle variant="secondary" style={{ width: "20rem" }}>
          {dropdownValues[url]}
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{ width: "20rem" }}
          onClick={() => setLoading(true)}
        >
          <Dropdown.Item
            onClick={() => {
              setUrl(0);
            }}
          >
            Base Lines
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setUrl(1);
            }}
          >
            Perfect Base Lines
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setUrl(2);
            }}
          >
            Alternate Lines
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setUrl(3);
            }}
          >
            Perfect Alternate Lines
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

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
      <div className="d-flex flex-wrap justify-content-center">
        {data
          .filter((item) => item.type === "player")
          .map((item, index) => {
            console.log(item);
            return (
              <Card
                style={{ minWidth: "20rem", maxWidth: "20rem" }}
                className="bg-secondary text-light m-1"
                key={index}
              >
                <Card.Title className="d-flex justify-content-between px-1 pt-1">
                  <div>{item.player.fullName}</div>
                  <div>{item.team.name}</div>
                </Card.Title>
                <Card.Body>
                  <Card.Text className="fw-bold">
                    {item.outcome} {item.line} {values[item.market.name]}{" "}
                    {
                      item.market.books[item.book][item.outcome].current.odds
                        .american
                    }
                  </Card.Text>
                  <div>
                    {item.insights.map((insight, index) => (
                      <Card.Text key={index}>{insight.description}</Card.Text>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Lines;
