import logo from "../images/logo.svg";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import iconpersone from "../images/iconpersone.svg";
import BurgerMenu from "./BurgerMenu";
import burgermedu from "../images/burger.svg";

function Navigation() {
  const [openMenu, setOpenMenu] = useState(true);
  function handleOpen() {
    setOpenMenu(false);
  }
  function handleClose() {
    setOpenMenu(true);
  }
  return (
    <header className='header'>
      <NavLink to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </NavLink>
      <nav className='header-navigation'>
        <div className='header-navigation__container'>
          <NavLink
            activeClassName='header-navigation__movies_active'
            to='/movies'
            className='header-navigation__movies'
          >
            Фильмы
          </NavLink>
          <NavLink
            activeClassName='header-navigation__movies_active'
            to='/saved-movies'
            className='header-navigation__movies'
          >
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

        <img
          onClick={handleOpen}
          className='header-navigation__button-burger'
          src={burgermedu}
          alt='Иконка бургерного меню'
        />
        <BurgerMenu open={openMenu} close={handleClose} />
      </nav>
    </header>
  );
}
export default Navigation;
