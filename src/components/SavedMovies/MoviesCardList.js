import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList({ deleteSaveHandler, movieAdded }) {
  return (
    <>
      <div className='line'></div>
      <section className='movies-card-list'>
        <MoviesCard
          deleteSaveHandler={deleteSaveHandler}
          movieAdded={movieAdded}
        />
      </section>
      <div className='movies-card-list__box-button'></div>
    </>
  );
}
export default MoviesCardList;
