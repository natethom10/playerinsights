import { useState, useRef, useEffect } from "react";

export default function Dropdown({ setUrl }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [optionNum, setOptionNum] = useState(0);

  const options = [
    "Base Lines",
    "Perfect Base Lines",
    "Alternate Lines",
    "Perfect Alternate Lines",
    "Risky Lines",
  ];

  const handleButton = (index) => {
    setOptionNum(index);
    setUrl(index);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left mb-1" ref={dropdownRef}>
      <div>
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {options[optionNum]}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleButton(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
