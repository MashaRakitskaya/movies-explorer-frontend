import React from "react";

function MoviesCard({ card, toggleLikeHandler, movieAdded }) {
  let added = movieAdded(card);
  const handleToggleClick = (e) => {
    e.preventDefault();
    toggleLikeHandler(card, !added);
  };
  function timeHandler(data) {
    let hour = Math.trunc(data / 60);
    let minut = data % 60;
    return hour + "ч " + minut + "м";
  }

  return (
    <article className='movies-card'>
      <div className='movies-card__discription'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{timeHandler(card.duration)}</p>
        <button
          onClick={handleToggleClick}
          className='movies-card__delete'
          type='button'
        ></button>
      </div>
      <a href={card.trailer} rel='noreferrer' target='_blank'>
        <img
          className='movies-card__image'
          src={card.image}
          alt='Фото заставка фильма'
        />
      </a>
    </article>
  );
}
export default MoviesCard;
