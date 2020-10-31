import React, { FC, useState } from 'react';
import Map from '../global/Map';
import SearchBar from './SearchBar';
import ResultsList from './ResultsList';

type SearchProps = {
  query: string
};

const Search: React.FC = () => {
  const [locationQuery, setLocationQuery] = useState('');

  return (
    <>
      <SearchBar onSubmit={(value: any) => setLocationQuery(value)} />
      <Map locationQuery={locationQuery} />
      <ResultsList />
    </>
  );
};

export default Search;
