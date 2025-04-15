import React from "react";

const Nav = ({ setLine }) => {
  return (
    <div className="fixed p-4 flex justify-between w-screen bg-gray-800 top-0 left-0 h-fit border-y-3 border-black">
      <div className="space-x-4 flex items-center">
        <h1 className="text-xl">PlayerInsights</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLine(0)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 hover:shadow-sm transition"
          >
            Base Lines
          </button>
          <button
            onClick={() => setLine(1)}
            className="border border-green-500 text-green-700 px-4 py-2 rounded-md hover:bg-green-100 hover:shadow-sm transition"
          >
            Perfect Base Lines
          </button>
          <button
            onClick={() => setLine(2)}
            className="border border-blue-500 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 hover:shadow-sm transition"
          >
            Alt Lines
          </button>
          <button
            onClick={() => setLine(3)}
            className="border border-yellow-500 text-yellow-700 px-4 py-2 rounded-md hover:bg-yellow-100 hover:shadow-sm transition"
          >
            Perfect Alt Lines
          </button>
          <button
            onClick={() => setLine(4)}
            className="border border-red-500 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 hover:shadow-sm transition"
          >
            Risky
          </button>
        </div>
      </div>
      <div className="flex w-3xs justify-between">
        <h1>Parlay Builder</h1>
        <h1>Guide</h1>
        <h1>Home</h1>
      </div>
    </div>
  );
};

export default Nav;
