import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

const Lines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.linemate.io/api/nba/v1/discovery/cards?cardGroup=PERFECT_HIT_RATE_RECENT_FORM&premium=true"
        );
        if (!response.ok) {
          throw new Error("Data not returned properly.");
        }

        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid w-fit gap-3 m-4 grid-cols-5">
      {data.map((dp, index) => {
        if (dp.type === "player") {
          const arr = [];
          for (let index in dp.insights) {
            arr.push(dp.insights[index].description);
          }
          return (
            <Card
              key={index}
              name={dp.player.fullName}
              outcome={dp.outcome}
              line={dp.line}
              marketname={dp.market.name}
              marketodds={
                dp.market.books[dp.book][dp.outcome].current.odds.american
              }
              insights={arr}
            />
          );
        }
      })}
    </div>
  );
};

export default Lines;
