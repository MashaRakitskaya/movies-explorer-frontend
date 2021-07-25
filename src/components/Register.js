import React, { useState } from "react";
import Form from "./Form";
import { NavLink } from "react-router-dom";

function Register({ onRegister }) {
  const initialData = {
    name: "",
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
    onRegister(data.name, data.email, data.password);
  };

  return (
    <section className='child-form'>
      <Form title='Добро пожаловать!' onSubmit={handleSubmit} name='login'>
        <label className='child-form__input-label' htmlFor='name-input'>
          Имя
        </label>
        <input
          value={data.name}
          id='name-input'
          className='child-form__input'
          type='name'
          name='name'
          onChange={handleChange}
        />
        <span id='name-input-error' className='child-form__input-error'></span>

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

        <button
          type='submit'
          className='child-form__save'
          value='Зарегистрироваться'
        >
          Зарегистрироваться
        </button>
        <p className='registration-question'>
          Уже зарегистрированы?
          <NavLink to='/signin' className='registration-question__link'>
            Войти
          </NavLink>
        </p>
      </Form>
    </section>
  );
}
export default Register;
