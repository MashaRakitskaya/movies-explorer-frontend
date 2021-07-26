import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";

function Form({ title, onSubmit, name, children }) {
  return (
    <div className='parent-form'>
      <NavLink to='/'>
        <img className='header__logo' src={logo} alt='Логотип' />
      </NavLink>
      {/* <img className='header__logo' src={logo} alt='Логотип' /> */}
      <h3 className='parent-form__title'>{title}</h3>
      <form
        className='parent-form__child-form'
        onSubmit={onSubmit}
        name={name}
        noValidate
      >
        {children}
      </form>
    </div>
  );
}
export default Form;
