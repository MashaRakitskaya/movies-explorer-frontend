import React from "react";
import pic from "../../images/pic__COLOR_pic.png";

function MoviesCard() {
  function handleClickLike(e) {
    e.target.classList.toggle("movies-card__save_pressed");
  }

  return (
    <>
      <article className='movies-card'>
        <div className='movies-card__discription'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <p className='movies-card__time'>1ч 47м</p>
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
          <button
            onClick={handleClickLike}
            className='movies-card__save'
            type='button'
          ></button>
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
