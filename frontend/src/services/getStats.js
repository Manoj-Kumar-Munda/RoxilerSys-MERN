export const getStats = async (month, searchText, page) => {
  try {
    const res = await fetch(
      `/api/v1/transactions?search=${searchText}&month=${month}&page=${page.page}&limit=${page.limit}`
    ).then((data) => data.json());
    console.log(res);
    return res;
  } catch (error) {
    console.log("error: ", error);
  }
};
