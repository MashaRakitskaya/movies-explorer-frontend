import React from "react";
import { URL_NOMOREPATIES } from "../../utils/constants";

function MoviesCard({ card, toggleLikeHandler, movieAdded }) {
  let added = movieAdded(card);

  const deleteSaveClick = (e) => {
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
          onClick={deleteSaveClick}
          className={
            added
              ? "movies-card__save movies-card__save_pressed"
              : "movies-card__save"
          }
          type='button'
        ></button>
      </div>
      <a href={card.trailerLink} rel='noreferrer' target='_blank'>
        <img
          className='movies-card__image'
          src={`${URL_NOMOREPATIES}` + card.image.url}
          alt='Фото заставка фильма'
        />
      </a>
    </article>
  );
}
export default MoviesCard;
