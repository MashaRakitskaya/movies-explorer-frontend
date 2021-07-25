import React, { useState } from "react";
import Form from "./Form";
import { NavLink } from "react-router-dom";

function Login({ onLogin }) {
  const initialData = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(data.email, data.password);
  };

  return (
    <section className='child-form'>
      <Form title='Рады видеть!' onSubmit={handleSubmit} name='login'>
        <label className='child-form__input-label' htmlFor='email-input'>
          E-mail
        </label>
        <input
          value={data.email}
          id='email-input'
          className='child-form__input'
          type='email'
          name='email'
          onChange={handleChange}
        />
        <span id='email-input-error' className='child-form__input-error'></span>

        <label className='child-form__input-label' htmlFor='password-input'>
          Пароль
        </label>
        <input
          value={data.password}
          id='password-input'
          className='child-form__input'
          type='password'
          name='password'
          onChange={handleChange}
        />
        <span
          id='password-input-error'
          className='child-form__input-error'
        ></span>

        <button type='submit' className='child-form__save' value='Войти'>
          Войти
        </button>
        <p className='registration-question'>
          Ещё не зарегистрированы?
          <NavLink to='/signup' className='registration-question__link'>
            Регистрация
          </NavLink>
        </p>
      </Form>
    </section>
  );
}
export default Login;
