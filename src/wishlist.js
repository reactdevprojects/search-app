import React, { useContext } from 'react';
import { GlobalStateContext } from './globalState';

const Wishlist =() => {
  const { wishlist, handleDeleteFromWishlist } = useContext(GlobalStateContext);


  return (
    <div>
      <h2>Wishlist Nr {wishlist.length}</h2>

      <ul>
        {wishlist.map((book, index) => (
          <li key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => handleDeleteFromWishlist(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;