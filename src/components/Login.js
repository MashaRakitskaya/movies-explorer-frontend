import React, { useState, useEffect } from "react";
import Form from "./Form";
import { NavLink } from "react-router-dom";

function Login({ error, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не должен быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не должен быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const handlerBlur = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setEmailError("Некорректный email, пример: text@mail.ru");
      if (!event.target.value) {
        setEmailError("Email не должен быть пустым");
      }
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setPasswordError("Пароль должен быть больше 8-ми символов");
      if (!event.target.value) {
        setPasswordError("Пароль не должен быть пустым");
      }
    } else if (event.target.value.length > 255) {
      setPasswordError("Пароль должен быть меньше 255-ти символов");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <section className='child-form'>
      <Form title='Рады видеть!' onSubmit={handleSubmit} name='login'>
        <label className='child-form__input-label' htmlFor='email-input'>
          E-mail
        </label>

        <input
          value={email}
          id='email-input'
          className='child-form__input'
          type='email'
          name='email'
          required
          onBlur={(event) => handlerBlur(event)}
          onChange={(event) => emailHandler(event)}
        />

        {emailDirty && emailError && (
          <span id='email-input-error' className='child-form__input-error'>
            {emailError}
          </span>
        )}
        <label className='child-form__input-label' htmlFor='password-input'>
          Пароль
        </label>
        <input
          value={password}
          id='password-input'
          className='child-form__input'
          type='password'
          name='password'
          required
          onBlur={(event) => handlerBlur(event)}
          onChange={(event) => passwordHandler(event)}
        />
        {passwordDirty && passwordError && (
          <span id='password-input-error' className='child-form__input-error'>
            {passwordError}
          </span>
        )}

        <button
          disabled={!formValid}
          type='submit'
          className='child-form__save'
          value='Войти'
        >
          Войти
        </button>

        {error && (
          <span id='submit-error' className='child-form__input-error'>
            Ошибка входа
          </span>
        )}
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
