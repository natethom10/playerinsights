import React, { useEffect, useState } from "react";
import Player from "./Player";

const PlayerStats = ({ player }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.linemate.io/api/nba/v2/players/${player}/games?sortingOrder=DESC&timeframe=RANGE_2022_2024`
      );
      if (!response.ok) {
        console.log("Something wrong.");
        return <></>;
      }

      const json = await response.json();

      setData([]);
      json.map((data) => {
        setData((prev) => [...prev, data]);
      });
    };

    fetchData();
  }, [player]);

  console.log(data);

  return (
    <div className="m-4 pt-15">
      {data.map((dp, index) => {
        return (
          <h1 key={index}>
            {index + 1} {dp.info.firstName} {dp.info.lastName}
          </h1>
        );
      })}
    </div>
  );
};

export default PlayerStats;
