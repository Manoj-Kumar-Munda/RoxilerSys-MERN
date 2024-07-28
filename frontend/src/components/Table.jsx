import React, { useEffect } from "react";
import TableHeadItem from "./TableHeadItem";

const Table = ({ data }) => {
  if (!data) {
    return <h1>No data available</h1>;
  }
  return (
    <div className="relative overflow-x-auto border px-2">
      <table className="min-w-full">
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
            <tr key={item.id} className="">
              <td className="">{item?.id}</td>
              <td className="">{item?.title}</td>
              <td className="line-clamp-2">{item?.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold.toString()}</td>
              <td>{item.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
