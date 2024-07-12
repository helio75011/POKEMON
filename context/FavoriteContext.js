// src/context/FavoriteContext.js
import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  const addFavorite = (pokemon) => {
    if (!favoritePokemon.some(fav => fav.name === pokemon.name)) {
      setFavoritePokemon([...favoritePokemon, pokemon]);
    }
  };

  const removeFavorite = (pokemon) => {
    setFavoritePokemon(favoritePokemon.filter(fav => fav.name !== pokemon.name));
  };

  return (
    <FavoriteContext.Provider value={{ favoritePokemon, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
