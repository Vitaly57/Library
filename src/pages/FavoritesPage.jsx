import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import BookCard from "../components/BookCard";
import "./HomePage.css";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="homepage">
      <header className="homepage__header">
        <h1>Избранные книги</h1>
      </header>
      {favorites.length > 0 ? (
        <div className="book-list">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          Вы еще не добавили ни одной книги в избранное.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
