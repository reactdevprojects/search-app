import { useContext } from 'react';
import { GlobalStateContext } from './globalState';

const SearchBar = () => {
  const { query, setQuery, handleSearch, loading } = useContext(GlobalStateContext);

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a book"
      />
      <button type="submit">Search</button>
      {loading && <p>Loading...</p>}
    </form>
  );
}

export default SearchBar;