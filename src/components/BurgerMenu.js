import React from "react";
import { NavLink } from "react-router-dom";
import iconpersone from "../images/iconpersone.svg";

function BurgerMenu({ open, close }) {
  return (
    <div
      className={`burger-menu-under ${open ? "" : "burger-menu-under_open"}`}
    >
      <div className={`burger-menu ${open ? "" : "burger-menu_open"}`}>
        <button onClick={close} className='burger-menu__button-close' />
        <ul className='burger-menu__link-box'>
          <NavLink className='burger-menu__link' exact to='/'>
            Главная
          </NavLink>

          <NavLink className='burger-menu__link' to='/movies'>
            Фильмы
          </NavLink>

          <NavLink className='burger-menu__link' to='/saved-movies'>
            Сохранённые фильмы
          </NavLink>
        </ul>
        <button className='burger-menu__button'>
          <img
            className='burger-menu__button-img'
            src={iconpersone}
            alt='Иконка человека'
          />
          <NavLink to='/profile' className='burger-menu__button-anchor'>
            Аккаунт
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default BurgerMenu;
