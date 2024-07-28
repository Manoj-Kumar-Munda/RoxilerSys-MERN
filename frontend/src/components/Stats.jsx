import React, { useEffect, useState } from "react";
import { getSales } from "../services/getSales";
import { monthsArr } from "../utils/constants";

const Stats = ({ month }) => {
  const [monthlyStats, setMonthlyStats] = useState(null);

  const fetch = async () => {
    const res = await getSales(month);
    setMonthlyStats(res?.data);
  };

  useEffect(() => {
    fetch();
  }, [month]);

  console.log("monthly: ", monthlyStats);
  return (
    <div>
      <h1 className="text-lg font-medium">
        Statistics {monthsArr[month - 1].name}
      </h1>

      <div className="max-w-md w-full border border-gray-300 px-2 py-4 rounded-lg shadow-lg my-2">
        {monthlyStats && (
          <>
            <div className="flex justify-between">
              <span>Total sales</span>
              <h1>{monthlyStats.totalSaleAmt}</h1>
            </div>

            <div className="flex justify-between">
              <span>Total sold items</span>
              <h1>{monthlyStats.totalSoldItems}</h1>
            </div>

            <div className="flex justify-between">
              <span>Total unsold items</span>

              <h1>{monthlyStats.totalUnsoldItems}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Stats);
