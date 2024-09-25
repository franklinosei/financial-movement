import React from "react";

const CapitalDisplay = ({ capital }) => {
  return (
    <div className="mt-4 text-black flex justify-center gap-x-10">
      <h2 className="text-lg font-bold">Current Capital</h2>
      <p className="text-2xl">{capital}</p>
    </div>
  );
};

export default CapitalDisplay;
