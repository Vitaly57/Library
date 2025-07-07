// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(query);
    }, 500); // Задержка в 500 мс

    return () => clearTimeout(timerId);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Введите название книги..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar__input"
      />
    </div>
  );
};

export default SearchBar;
