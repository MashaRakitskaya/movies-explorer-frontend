import React from "react";

function MoviesCard({ card, deleteSaveHandler, savedMovies, movieAdded }) {
  const URL = "https://api.nomoreparties.co";
  let added = movieAdded(card);

  // function handleClickLike(e) {
  //   e.target.classList.toggle("movies-card__save_pressed");
  // }

  const deleteSaveClick = (e) => {
    e.preventDefault();
    deleteSaveHandler(card, !added);
  };
  return (
    <article className='movies-card'>
      <div className='movies-card__discription'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{card.duration}</p>
        <button
          onClick={deleteSaveClick}
          // className='movies-card__save'
          className={added ? "movies-card__save_pressed" : "movies-card__save"}
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
