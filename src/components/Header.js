import logo from "../images/logo.svg";
import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";

function Header({ loggedIn }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип' />
      {loggedIn ? (
        <Navigation />
      ) : (
        <nav className='header__container'>
          <NavLink to='/signup' className='header__registration'>
            Регистрация
          </NavLink>
          <NavLink to='/signin' className='header__login'>
            Войти
          </NavLink>
        </nav>
      )}
    </header>
  );
}
export default Header;
