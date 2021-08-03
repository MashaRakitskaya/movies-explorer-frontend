import logo from "../images/logo.svg";
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </NavLink>
      <nav className='header__container'>
        <NavLink to='/signup' className='header__registration'>
          Регистрация
        </NavLink>
        <NavLink to='/signin' className='header__login'>
          Войти
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
