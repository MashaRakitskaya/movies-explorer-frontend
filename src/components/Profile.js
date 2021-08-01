import React, { useState } from "react";
import Navigation from "./Navigation";

function Profile({ onEdit, signOut }) {
  const initialData = {
    name: "",
    email: "",
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
    onEdit(data.name, data.email);
  };
  return (
    <>
      <Navigation />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, Виталий!</h2>
          <form className='profile__form' onSubmit={handleSubmit}>
            <div className='profile__label-input-box'>
              <label className='profile__input-label' htmlFor='name-input'>
                Имя
              </label>

              <input
                className='profile__input'
                id='name-input'
                type='name'
                name='name'
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <span id='name-input-error' className='profile__input-error'></span>

            <div className='profile__label-input-box'>
              <label className='profile__input-label' htmlFor='email-input'>
                E-mail
              </label>

              <input
                className='profile__input'
                id='email-input'
                type='email'
                name='email'
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <span
              id='email-input-error'
              className='profile__input-error'
            ></span>
            <button
              type='submit'
              className='profile__edit'
              value='Редактировать'
            >
              Редактировать
            </button>
          </form>

          <a onClick={signOut} className='profile__signout'>
            Выйти из аккаунта
          </a>
        </div>
      </section>
    </>
  );
}
export default Profile;
