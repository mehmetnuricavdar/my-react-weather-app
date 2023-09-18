import "./App.css";
import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import WeatherApp from "./Components/WeatherApp";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} ></SearchBar>
      <WeatherApp searchValue={searchValue} />
    </div>
  );
}

export default App;
