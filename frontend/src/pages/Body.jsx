import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import { getStats } from "../services/getStats";
import { monthsArr } from "../utils/constants";
import Stats from "../components/Stats";

const Body = () => {
  const [month, setMonth] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 2,
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(async () => {
      const res = await getStats(month, searchText, paginate);
      if (res?.success) {
        setData(res.data);
        setIsLoading(false);
      } else {
        setData(null);
        setIsLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [month, searchText, paginate]);

  const handlePrev = () => {
    if(paginate.page === 1){
      return;
    }
    setPaginate((prev) => {
      return { ...prev, page: prev.page - 1 };
    });
  };
  const handleNext = () => {
    setPaginate((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  };

  if (!isLoading && !data) {
    return <h1>No data found</h1>;
  }
  return (
    <div className="px-4 py-2 max-w-screen-xl mx-auto space-y-4">
      <div className="flex justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <Dropdown month={month} setMonth={setMonth} />
      </div>

      <h1 className="text-2xl font-semibold">
        Transaction Dashboard
      </h1>
      {isLoading ? <h1 className="min-h-[20vh]">Loading...</h1> : <Table data={data} />}

      <div className="flex justify-between">
        <div className="inline-flex mx-auto gap-2">
          <button className="border bg-gray-700 text-white px-6 rounded-md" onClick={handlePrev}>Prev</button>
          <button className="border bg-gray-700 text-white px-6 rounded-md" onClick={handleNext}>Next</button>
        </div>


        <div className="inline-flex flex-col text-sm">
          <span>Page: {paginate.page}</span>
          <span>Results per page: {paginate.limit}</span>
        </div>
      </div>

      <Stats month={month} />
    </div>
  );
};

export default Body;
