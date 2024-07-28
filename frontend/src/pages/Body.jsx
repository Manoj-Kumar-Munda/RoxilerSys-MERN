import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import { getStats } from "../services/getStats";

const Body = () => {
  const [month, setMonth] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(async () => {
      const res = await getStats(month, searchText, paginate);
      console.log(res);
      if (res?.success) {
        setData(res.data);
        setIsLoading(false);
      } else {
        setData(null);
        setIsLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [month, searchText, paginate]);

  console.log(data);

  if (!isLoading && !data) {
    return <h1>No data found</h1>;
  }
  return (
    <div className="px-4 py-2 max-w-screen-xl mx-auto space-y-4">
      <div className="flex justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <Dropdown month={month} setMonth={setMonth} />
      </div>
      {isLoading ? <h1>Loading...</h1> : <Table data={data} />}
    </div>
  );
};

export default Body;
