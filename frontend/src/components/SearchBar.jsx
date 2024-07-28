import React from "react";

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <div className="max-w-64 w-full">
      <input
        type="text"
        value={searchText}
        placeholder="Enter title, description or price"
        className="border-2 border-gray-500 rounded-md  w-full text-sm py-2 pl-2"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
