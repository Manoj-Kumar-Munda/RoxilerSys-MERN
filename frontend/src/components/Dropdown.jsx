import React from "react";
import { monthsArr } from "../utils/constants";

const Dropdown = ({ month, setMonth }) => {
  return (
    <div>
      <select
        className="text-sm border-2 py-2 px-4 rounded-md border-gray-500"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {monthsArr.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(Dropdown);
