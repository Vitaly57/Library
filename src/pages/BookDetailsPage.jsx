import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchBookById } from "../api/googleBooksAPI";
import { FavoritesContext } from "../context/FavoritesContext";
import "./BookDetailsPage.css";

const BookDetailsPage = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const bookId = location.pathname;
    if (bookId) {
      setLoading(true);
      setError(null);
      fetchBookById(bookId)
        .then((data) => setBook(data))
        .catch((err) => setError("Не удалось загрузить информацию о книге."))
        .finally(() => setLoading(false));
    }
  }, [location.pathname]);

  if (loading) return <div className="details-loader">Загрузка...</div>;
  if (error) return <div className="details-error">{error}</div>;
  if (!book) return <div>Книга не найдена.</div>;

  const title = book.title || "Название неизвестно";
  const description = book.description
    ? typeof book.description === "string"
      ? book.description
      : book.description.value
    : "Описание отсутствует.";
  const coverUrl =
    book.covers && book.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : "https://via.placeholder.com/300x450.png?text=No+Cover";
  const isBookFavorite = isFavorite(location.pathname);

  const bookForFavorites = {
    id: location.pathname,
    title: title,
    authors: book.authors
      ? book.authors.map((a) => a.name)
      : ["Автор неизвестен"],
    cover_i: book.covers ? book.covers[0] : null,
    first_publish_year: book.publish_date || book.first_publish_date,
  };

  return (
    <div className="book-details-container">
      <Link to="/" className="back-link">
        ← Назад к поиску
      </Link>
      <div className="book-details">
        <div className="book-details__cover">
          <img src={coverUrl} alt={`Обложка ${title}`} />
        </div>
        <div className="book-details__info">
          <h1>{title}</h1>
          <button
            onClick={() => toggleFavorite(bookForFavorites)}
            className="favorite-button-details"
          >
            {isBookFavorite
              ? "❤️ Убрать из избранного"
              : "🤍 Добавить в избранное"}
          </button>
          <p className="book-details__description">
            {description.split("----------")[0].trim()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
