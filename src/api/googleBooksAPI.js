// src/api/googleBooksAPI.js
import axios from "axios";

const API_URL = "https://openlibrary.org/search.json";
const PAGE_LIMIT = 12;

// Функция для поиска книг (у вас она уже есть и работает)
export const fetchBooks = async (query = "javascript", page = 1) => {
  if (!query) return { books: [], total: 0 };
  try {
    const response = await axios.get(API_URL, {
      params: { q: query, page, limit: PAGE_LIMIT },
    });
    const books = response.data.docs.map((doc) => ({
      id: doc.key,
      title: doc.title,
      authors: doc.author_name || ["Автор неизвестен"],
      cover_i: doc.cover_i,
      first_publish_year: doc.first_publish_year,
    }));
    return { books, total: response.data.numFound };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// --- ВОТ ФУНКЦИЯ, КОТОРУЮ НУЖНО ДОБАВИТЬ ИЛИ ПРОВЕРИТЬ ---
// Функция для получения деталей одной книги
export const fetchBookById = async (bookId) => {
  try {
    // URL для запроса одной книги отличается от URL для поиска
    const response = await axios.get(`https://openlibrary.org${bookId}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};
