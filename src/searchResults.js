import { useContext } from 'react';
import { GlobalStateContext } from './globalState';

const SearchResults = () => {
  const { searchResults, handleAddToWishlist } = useContext(GlobalStateContext);

  return (
    <ul>
      {searchResults.map(result => (
        <li key={result.id} onClick={() => handleAddToWishlist(result)}>
          <img src={result.volumeInfo.imageLinks.thumbnail} alt={result.volumeInfo.title} />
          <h3>{result.volumeInfo.title}</h3>
          {result.volumeInfo.authors && <p>By: {result.volumeInfo.authors.join(', ')}</p>}

          <p>Publisher: {result.volumeInfo.publisher}</p>
          <p>Published: {result.volumeInfo.publishedDate}</p>
          <p>{result.volumeInfo.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;