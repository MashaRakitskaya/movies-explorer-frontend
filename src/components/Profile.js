import React, { useState } from "react";
import Navigation from "./Navigation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile({ signOut, editUserInfo }) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser);
  const [userData, setUserData] = useState(currentUser);

  // const initialData = {
  //   name: "",
  //   email: "",
  // };
  // const [data, setData] = useState(userData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArray = { name: userData.name, email: userData.email };
    editUserInfo(newArray);
  };
  return (
    <>
      <Navigation />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
          <form className='profile__form' onSubmit={handleSubmit} noValidate>
            <div className='profile__label-input-box'>
              <label className='profile__input-label' htmlFor='name-input'>
                Имя
              </label>

              <input
                className='profile__input'
                id='name-input'
                type='name'
                name='name'
                value={userData.name}
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
                value={userData.email}
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
