import React from "react";
import { NavLink } from "react-router-dom";
import iconpersone from "../images/iconpersone.svg";

function BurgerMenu({ open, close }) {
  return (
    <div className={`burger-menu ${open ? "" : "burger-menu_open"}`}>
      <button onClick={close} className='burger-menu__button-close' />
      <div className='burger-menu__link-box'>
        <NavLink className='burger-menu__link' exact to='/'>
          Главная
        </NavLink>

        <NavLink className='burger-menu__link' to='/movies'>
          Фильмы
        </NavLink>

        <NavLink className='burger-menu__link' to='/saved-movies'>
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
    </div>
  );
}

export default BurgerMenu;
