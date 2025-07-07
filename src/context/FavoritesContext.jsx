// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("favoriteBooks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const toggleFavorite = useCallback((bookToToggle) => {
    setFavoriteBooks((currentBooks) => {
      const isFavorited = currentBooks.some(
        (book) => book.id === bookToToggle.id
      );
      if (isFavorited) {
        return currentBooks.filter((book) => book.id !== bookToToggle.id);
      } else {
        return [...currentBooks, bookToToggle];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (bookId) => {
      return favoriteBooks.some((book) => book.id === bookId);
    },
    [favoriteBooks]
  );

  const value = {
    favorites: favoriteBooks, // <-- Возвращаем массив с книгами
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
