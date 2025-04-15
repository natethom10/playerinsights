import React, { useEffect, useState } from "react";
import Card from "./Card";

const AllLines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.linemate.io/api/nba/v1/discovery/cards?premium=true"
        );
        if (!response.ok) {
          console.error("Data not received properly.");
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
    <div className="grid w-fit grid-cols-5 gap-3 m-4">
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

export default AllLines;
