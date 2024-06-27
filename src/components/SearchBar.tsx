import React, { useState, ChangeEventHandler } from "react";

interface SearchBarProps {
  onSearch: (term: string | number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Número, Nome, Email..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
