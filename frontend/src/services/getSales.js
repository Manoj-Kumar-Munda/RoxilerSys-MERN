export async function getSales(month) {
  try {
    const res = await fetch(`/api/v1/transactions/sales?month=${month}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}
