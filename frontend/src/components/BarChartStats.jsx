import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatBarChartData } from "../utils/formatData";
import { monthsArr } from "../utils/constants";

const BarChartStats = ({ month }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`/api/v1/transactions/barchart?month=${month}`);
    const data = await res.json();
    const barChartData = formatBarChartData(data?.data);
    console.log(barChartData);
    setData(barChartData);
  };

  useEffect(() => {
    fetchData();
  }, [month]);
  console.log(data);

  return (
    <div className="space-y-4">
        <h1 className="text-lg font-medium">Bar Chart Stats - {monthsArr[month-1].name}</h1>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="itemCount"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(BarChartStats);
