import React, { useEffect } from "react";
import TableHeadItem from "./TableHeadItem";

const Table = ({ data }) => {
  if (!data) {
    return <h1>No data available</h1>;
  }
  return (
    <div className="relative overflow-x-auto border border-gray-300 py-1 rounded-md px-2 shadow-lg">
      <table className="min-w-full table-auto">
        <thead className="">
          <tr>
            <TableHeadItem>ID</TableHeadItem>
            <TableHeadItem>Title</TableHeadItem>
            <TableHeadItem>Description</TableHeadItem>
            <TableHeadItem>Price</TableHeadItem>
            <TableHeadItem>Category</TableHeadItem>
            <TableHeadItem>Sold</TableHeadItem>
            <TableHeadItem>Image</TableHeadItem>
          </tr>
        </thead>
        <tbody className="">
          {data.map((item) => (
            <tr key={item.id} className="border-b last:border-b-0">
              <td className="px-2 align-top">{item?.id}</td>
              <td className="px-2">{item?.title}</td>
              <td className="line-clamp-2 px-2">{item?.description}</td>
              <td className="px-2 align-top">{item.price}</td>
              <td className="px-2 align-top">{item.category}</td>
              <td className="px-2 align-top">{item.sold.toString()}</td>
              <td className="px-2 align-top">{item.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
