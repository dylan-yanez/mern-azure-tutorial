import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

const SearchTool = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (term) => {
    setSearchQuery(term);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {searchQuery && <SearchResult searchQuery={searchQuery} />}
    </div>
  );
};

export default SearchTool;