import React from "react";

function MoviesCard({ card, toggleLikeHandler, movieAdded }) {
  let added = movieAdded(card);
  const handleToggleClick = (e) => {
    e.preventDefault();
    toggleLikeHandler(card, !added);
  };

  return (
    <article className='movies-card'>
      <div className='movies-card__discription'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{card.duration}</p>
        <button
          onClick={handleToggleClick}
          className='movies-card__delete'
          type='button'
        ></button>
      </div>
      <img
        className='movies-card__image'
        src={card.image}
        alt='Фото заставка фильма'
      />
    </article>
  );
}
export default MoviesCard;
