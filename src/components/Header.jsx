import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <Link to="#" className="app-header__logo">
        Library
      </Link>
      <nav className="app-header__nav">
        <NavLink to="/" end>
          Поиск
        </NavLink>
        <NavLink to="/favorites">Избранное</NavLink>
      </nav>
    </header>
  );
};

export default Header;
