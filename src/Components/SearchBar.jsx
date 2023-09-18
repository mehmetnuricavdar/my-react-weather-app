import React from "react";

const SearchBar = ({ searchValue, setSearchValue }) => {

  const handleSearch = () => {
    setSearchValue(searchValue.trim());
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="card">
      <div className="search">
        <button id="current-location">
          <i className="material-icons">&#xe569;</i>
        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button id="search-button" onClick={handleSearch}>
          <i className="material-icons">&#xe8b6;</i>
        </button>
      </div>
    </div>
  );
};


export default SearchBar;