import React, { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import Preloader from "../Movies/Preloader";

function MoviesCardList({
  toggleLikeHandler,
  movieAdded,
  savedMovies,
  preloader,
}) {
  const [showFoundMovies, setShowFoundMovies] = useState([]);
  useEffect(() => {
    setShowFoundMovies([...savedMovies]);
  }, [savedMovies]);

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
