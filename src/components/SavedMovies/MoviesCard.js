import React from "react";
import pic from "../../images/pic__COLOR_pic.png";

function MoviesCard({ deleteSaveHandler, movieAdded }) {
  return (
    <>
      <article className='movies-card'>
        <div className='movies-card__discription'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__time'>1ч 47м</p>
          <button className='movies-card__delete' type='button'></button>
        </div>
        <img
          className='movies-card__image'
          src={pic}
          alt='Фото заставка фильма'
        />
      </article>

      <article className='movies-card'>
        <div className='movies-card__discription'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__time'>1ч 47м</p>
          <button className='movies-card__delete' type='button'></button>
        </div>
        <img
          className='movies-card__image'
          src={pic}
          alt='Фото заставка фильма'
        />
      </article>

      <article className='movies-card'>
        <div className='movies-card__discription'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__time'>1ч 47м</p>
          <button className='movies-card__delete' type='button'></button>
        </div>
        <img
          className='movies-card__image'
          src={pic}
          alt='Фото заставка фильма'
        />
      </article>

      <article className='movies-card'>
        <div className='movies-card__discription'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__time'>1ч 47м</p>
          <button className='movies-card__delete' type='button'></button>
        </div>
        <img
          className='movies-card__image'
          src={pic}
          alt='Фото заставка фильма'
        />
      </article>
    </>
  );
}
export default MoviesCard;
