import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList({ deleteSaveHandler, movieAdded, savedMovies }) {
  return (
    <>
      <div className='line'></div>
      <section className='movies-card-list'>
        {savedMovies.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            deleteSaveHandler={deleteSaveHandler}
            movieAdded={movieAdded}
          />
        ))}
      </section>
      <div className='movies-card-list__box-button'></div>
    </>
  );
}
export default MoviesCardList;
