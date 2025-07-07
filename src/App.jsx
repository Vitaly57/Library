import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/*" element={<BookDetailsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
