// import React, { useState } from "react";
// import Navigation from "./Navigation";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

// function Profile({ signOut, editUserInfo }) {
//   const currentUser = React.useContext(CurrentUserContext);
//   const [userData, setUserData] = useState(currentUser);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((data) => ({
//       ...data,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newArray = { name: userData.name, email: userData.email };
//     editUserInfo(newArray);
//   };
//   return (
//     <>
//       <Navigation />
//       <section className='profile'>
//         <div className='profile__container'>
//           <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
//           <form className='profile__form' onSubmit={handleSubmit} noValidate>
//             <div className='profile__label-input-box'>
//               <label className='profile__input-label' htmlFor='name-input'>
//                 Имя
//               </label>

//               <input
//                 className='profile__input'
//                 id='name-input'
//                 type='name'
//                 name='name'
//                 value={userData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             <span id='name-input-error' className='profile__input-error'></span>

//             <div className='profile__label-input-box'>
//               <label className='profile__input-label' htmlFor='email-input'>
//                 E-mail
//               </label>

//               <input
//                 className='profile__input'
//                 id='email-input'
//                 type='email'
//                 name='email'
//                 value={userData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <span
//               id='email-input-error'
//               className='profile__input-error'
//             ></span>
//             <button
//               type='submit'
//               className='profile__edit'
//               value='Редактировать'
//             >
//               Редактировать
//             </button>
//           </form>

//           <a onClick={signOut} className='profile__signout'>
//             Выйти из аккаунта
//           </a>
//         </div>
//       </section>
//     </>
//   );
// }
// export default Profile;

import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile({ signOut, editUserInfo, errorProfile }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameError, setNameError] = useState("Имя не должен быть пустым");
  const [emailError, setEmailError] = useState("Email не должен быть пустым");

  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  useEffect(() => {
    if (name === "") {
      setNameError("Имя не должен быть пустым");
    } else if (name.length < 2) {
      setNameError("Имя не должно быть больше 2х букв");
    } else {
      setNameError("");
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
      setEmailError("Email не должен быть пустым");
    } else if (!re.test(String(email).toLowerCase())) {
      setEmailError("Некорректный email, пример: text@mail.ru");
    } else {
      setEmailError("");
    }
  }, [name, email]);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArray = { name: name, email: email };
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
                value={name}
                required
                onChange={(event) => nameHandler(event)}
              />
            </div>
            {nameError && (
              <span id='name-input-error' className='profile__input-error'>
                {nameError}
              </span>
            )}

            <div className='profile__label-input-box'>
              <label className='profile__input-label' htmlFor='email-input'>
                E-mail
              </label>

              <input
                className='profile__input'
                id='email-input'
                type='email'
                name='email'
                value={email}
                required
                onChange={(event) => emailHandler(event)}
              />
            </div>

            {emailError && (
              <span id='email-input-error' className='profile__input-error'>
                {emailError}
              </span>
            )}

            <button
              disabled={
                (currentUser.name === name && currentUser.email === email) ||
                !formValid
              }
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

          {errorProfile && (
            <span id='submit-error' className='child-form__input-error'>
              Ошибка редактирования
            </span>
          )}
        </div>
      </section>
    </>
  );
}
export default Profile;
