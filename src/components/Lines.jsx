import React, { useEffect, useState } from "react";
import Card from "./Card";

const Lines = ({ url, playerChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
  }, [url]);


  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(data[0]);

  return (
    <div className="grid w-fit gap-3 grid-cols-5 m-4 pt-15">
      <button className="border border-black col-span-full bg-gray-600 rounded-md hover:cursor-pointer hover:bg-gray-700">
        Filter
      </button>
      {data
        .filter((dp) => dp.type === "player")
        .map((dp, index) => {
          const arr = [];
          for (let index in dp.insights) {
            arr.push(dp.insights[index].description);
          }

          return (
            <Card
              onClick={() => playerChange(dp)}
              book={dp.book}
              key={index}
              name={dp.player.fullName}
              teamname={dp.team.city + " " + dp.team.name}
              outcome={dp.outcome}
              line={dp.line}
              marketname={dp.market.name}
              marketodds={
                dp.alternate === true
                  ? dp.market.books[dp.book][dp.outcome].alternates[dp.line]
                      .odds.american
                  : dp.market.books[dp.book][dp.outcome].current.odds.american
              }
              insights={arr}
            />
          );
        })}
    </div>
  );
};

export default Lines;
