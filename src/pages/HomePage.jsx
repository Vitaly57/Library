// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchBooks } from "../api/googleBooksAPI";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar"; // <-- Импортируем существующий SearchBar
import "./HomePage.css";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("javascript");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // useEffect для загрузки данных
  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    fetchBooks(searchQuery, page)
      .then((data) => {
        setBooks((prev) =>
          page === 1 ? data.books : [...prev, ...data.books]
        );
        setHasMore(data.total > page * 12);
      })
      .catch((err) => setError("Ошибка загрузки книг"))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  // Функция для сброса при новом поиске
  const handleSearch = useCallback(
    (query) => {
      if (query !== searchQuery) {
        setSearchQuery(query);
        setBooks([]);
        setPage(1);
      }
    },
    [searchQuery]
  );

  // Логика для infinite scroll
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="homepage">
      <header className="homepage__header">
        <h1>Поиск книг</h1>
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      </header>
      <div className="book-list">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book.id || index}>
                <BookCard book={book} />
              </div>
            );
          } else {
            return <BookCard key={book.id || index} book={book} />;
          }
        })}
      </div>
      {loading && <div className="loader">Загрузка...</div>}
      {error && <div className="error-message">{error}</div>}
      {!hasMore && !loading && books.length > 0 && (
        <div className="all-results-loaded">Все результаты загружены</div>
      )}
    </div>
  );
};

export default HomePage;
