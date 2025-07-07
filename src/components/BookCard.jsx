import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";
import { FavoritesContext } from "../context/FavoritesContext";

const HeartIcon = ({ isFavorite }) => (
  <span style={{ fontSize: "1.5rem" }}>{isFavorite ? "❤️" : "🤍"}</span>
);

const BookCard = ({ book }) => {
  if (!book) {
    return null;
  }

  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const title = book?.title || "Название неизвестно";
  const authors = Array.isArray(book?.authors)
    ? book.authors.join(", ")
    : "Автор неизвестен";
  const year = book?.first_publish_year || "";
  const coverUrl = book?.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/128x192.png?text=No+Cover";

  const isBookFavorite = book.id ? isFavorite(book.id) : false;

  const handleCardClick = () => {
    if (book.id) {
      navigate(book.id);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (book.id) {
      toggleFavorite(book);
    }
  };

  return (
    <div className="book-card" onClick={handleCardClick}>
      <button onClick={handleFavoriteClick} className="book-card__favorite-btn">
        <HeartIcon isFavorite={isBookFavorite} />
      </button>

      <img
        src={coverUrl}
        alt={`Обложка книги ${title}`}
        className="book-card__cover"
      />

      <div className="book-card__info">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__authors">{authors}</p>
        <p className="book-card__year">{year}</p>
      </div>
    </div>
  );
};

export default BookCard;
