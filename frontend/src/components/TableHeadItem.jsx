import React from "react";

const TableHeadItem = ({ children }) => {
  return (
    <th scope="col" className="text-start px-2 py-2">
      <span>{children}</span>
    </th>
  );
};

export default TableHeadItem;
