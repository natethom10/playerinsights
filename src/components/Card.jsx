import React from "react";

const Card = (props) => {
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
  };

  return (
    <div className="border border-black w-sm p-2 bg-gray-600 hover:bg-gray-700 hover:cursor-pointer" onClick={props.onClick}>
      <div className="flex justify-between">
        <h1>{props.name}</h1>
        <h1>{props.teamname}</h1>
      </div>

      <div className="flex justify-between">
        <h1>
          {props.outcome} {props.line}{" "}
          <span className="text-green-500">{values[props.marketname]}</span>{" "}
          {props.marketodds}
        </h1>
        <h1>{props.book}</h1>
      </div>

      <ul>
        {props.insights.map((insight, index) => {
          return <li key={index}>{insight}</li>;
        })}
      </ul>
    </div>
  );
};

export default Card;
