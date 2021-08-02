import React from "react";

function MoviesCard({ card, deleteSaveHandler }) {
  const URL = "https://api.nomoreparties.co";
  function handleClickLike(e) {
    e.target.classList.toggle("movies-card__save_pressed");
  }

  return (
    <article className='movies-card'>
      <div className='movies-card__discription'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{card.duration}</p>
        <button
          onClick={handleClickLike}
          className='movies-card__save'
          type='button'
        ></button>
      </div>
      <img
        className='movies-card__image'
        src={`${URL}` + card.image.url}
        alt='Фото заставка фильма'
      />
    </article>
  );
}
export default MoviesCard;
