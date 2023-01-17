import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

 

//   throttle
  let canRun = true;
  const handleSearch = (e) => {
    e.preventDefault();
    if (!canRun) return;
    canRun = false;
    setSearchResults([]);
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=5`);
        if (res.status === 200 && res.data.items) {
          setSearchResults(prevState => [...prevState, ...res.data.items]);
        }
        setQuery("");
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      canRun = true;
    }, 5000);
  };


//   debounce
//   let timeoutId;

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(async () => {
//       setSearchResults([]);
//       setLoading(true);
//       try {
//         const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=5`);
//         if (res.status === 200 && res.data.items) {
//           setSearchResults(prevState => [...prevState, ...res.data.items]);
//         }
//         setQuery("");
//       } catch (err) {
//         console.log(err);
//       }
//       setLoading(false);
//     }, 5000);
//   };

//   useEffect(() => {
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, []);
  

// const handleSearch = (e) => {
//     e.preventDefault();
//     setQuery(e.target.value);
//   };
  
//   useEffect(() => {
//     if (!query) return;
//     setLoading(true);
//     axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=5`)
//       .then(res => {
//         if (res.status === 200 && res.data.items) {
//           setSearchResults(res.data.items);
//         }
//       })
//       .catch(err => console.log(err))
//       .finally(() => setLoading(false));
//   }, [query]);

  const handleAddToWishlist = (book) => {
    const index = wishlist.findIndex(b => b.id === book.id);
    if (index === -1) {
      setWishlist(prevState => [...prevState, book]);
    }
  
  }


  const handleRemoveFromWishlist = (book) => {
    setWishlist(wishlist.filter(b => b.id !== book.id));
  }

  const handleDeleteFromWishlist = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(index, 1);
    setWishlist(updatedWishlist);
  }
  return (
    <GlobalStateContext.Provider value={{
      searchResults,
      wishlist,
      handleSearch,
      handleAddToWishlist,
      handleRemoveFromWishlist,
      handleDeleteFromWishlist,
      query,
      setQuery,
      loading
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}