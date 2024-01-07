// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [rocketName, setRocketName] = useState('');

  const handleSearch = () => {
    onSearch(rocketName);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="Search by Rocket Name"
        value={rocketName}
        onChange={(e) => setRocketName(e.target.value)}
      />
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
