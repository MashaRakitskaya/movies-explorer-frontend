import React from "react";
import MoviesCard from "./MoviesCard";
import Preloader from "../Movies/Preloader";

function MoviesCardList({
  toggleLikeHandler,
  movieAdded,
  preloader,
  showFoundMovies,
}) {
  return (
    <>
      <div className='line'></div>
      {preloader ? (
        <Preloader />
      ) : (
        <section className='movies-card-list'>
          {showFoundMovies.map((item) => {
            return (
              <MoviesCard
                key={item._id}
                card={item}
                toggleLikeHandler={toggleLikeHandler}
                movieAdded={movieAdded}
              />
            );
          })}
        </section>
      )}
      <div className='movies-card-list__box-button'></div>
    </>
  );
}
export default MoviesCardList;
