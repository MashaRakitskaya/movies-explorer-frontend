import logo from "../images/logo.svg";
import React from "react";
import { NavLink } from "react-router-dom";
import iconpersone from "../images/iconpersone.svg";

function Navigation() {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </NavLink>
      <nav className='header-navigation'>
        <div className='header-navigation__container'>
          <NavLink to='/movies' className='header-navigation__movies'>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className='header-navigation__movies'>
            Сохранённые фильмы
          </NavLink>
        </div>
        <button className='header-navigation__button'>
          <img
            className='header-navigation__button-img'
            src={iconpersone}
            alt='Иконка человека'
          />
          <NavLink to='/profile' className='header-navigation__button-anchor'>
            Аккаунт
          </NavLink>
        </button>
      </nav>
    </header>
  );
}
export default Navigation;
