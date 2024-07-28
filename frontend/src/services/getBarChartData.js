import { formatBarChartData } from "../utils/formatData";

export const getBarChartData = async (month) => {
  const res = await fetch(`/api/v1/transactions/barchart?month=${month}`);
  const data = await res.json();
  const barChartData = formatBarChartData(data?.data);
  return barChartData;
};
