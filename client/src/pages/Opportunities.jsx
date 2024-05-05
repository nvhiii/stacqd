import React from "react";
import { useNavigate } from "react-router-dom";

function Opportunities() {
  const navigate = useNavigate(); // Utilize useNavigate hook
  const navigateSummary = () => {
    navigate("/summarizer");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-around py-10 border-purple-800 border-2 my-10 bg-slate-400">
        <div className="p-5 m-5">
          <button
            onClick={navigateSummary}
            className="bg-blue-500 text-white p-3 rounded-lg"
          >
            Summarizer
          </button>
        </div>
        <div className="p-5 m-5">
          <button className="bg-blue-500 text-white p-3 rounded-lg">
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;
