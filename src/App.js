import React from 'react';
import { GlobalStateProvider } from './globalState';
import SearchBar from './searchBar';
import SearchResults from './searchResults';
import Wishlist from './wishlist';
const App = () => {
  return (
    <GlobalStateProvider>
      <Wishlist />
      <SearchBar />
      <SearchResults />
    </GlobalStateProvider>
  );
}

export default App;