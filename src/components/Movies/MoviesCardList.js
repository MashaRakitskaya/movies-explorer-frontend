import React, { useState, useEffect } from "react";
import MoviesCard from "./MoviesCard";
import Preloader from "./Preloader";
import { BIG_WIDTH, MEDIUM_WIDTH, SMALL_WIDTH } from "../../utils/constants";

function MoviesCardList({
  foundMovies,
  preloader,
  toggleLikeHandler,
  savedMovies,
  movieAdded,
}) {
  const [showFoundMovies, setShowFoundMovies] = useState([]);
  let count;

  function getQuantity(windowSize) {
    if (windowSize >= BIG_WIDTH) {
      return { first: 12, next: 3 };
    }
    if (windowSize > SMALL_WIDTH && windowSize <= MEDIUM_WIDTH) {
      return { first: 8, next: 2 };
    }
    return { first: 5, next: 2 };
  }

  const resizeHandler = () => {
    const windowSize = window.innerWidth;
    const countFirst = getQuantity(windowSize);
    if (!count || count.first !== countFirst.first) {
      count = countFirst;
      setShowFoundMovies(foundMovies.slice(0, count.first));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    const windowSize = window.innerWidth;
    const countFirst = getQuantity(windowSize);
    count = countFirst;
    setShowFoundMovies(foundMovies.slice(0, count.first));
  }, [foundMovies]);

  function addMore() {
    const windowSize = window.innerWidth;
    const countNext = getQuantity(windowSize);
    count = countNext;
    const last = showFoundMovies.length;
    setShowFoundMovies(
      showFoundMovies.concat(foundMovies.slice(last, last + count.next))
    );
  }

  return (
    <>
      <div className='line'></div>
      {showFoundMovies.length !== 0 ? (
        <>
          {preloader ? (
            <Preloader />
          ) : (
            <>
              <section className='movies-card-list'>
                {showFoundMovies.map((item) => {
                  return (
                    <MoviesCard
                      card={item}
                      key={item.id}
                      toggleLikeHandler={toggleLikeHandler}
                      savedMovies={savedMovies}
                      movieAdded={movieAdded}
                    />
                  );
                })}
              </section>
              {showFoundMovies.length < foundMovies.length && (
                <div className='movies-card-list__box-button'>
                  <button
                    onClick={addMore}
                    className='movies-card-list__button-more'
                  >
                    Еще
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <h3 className='text-nothing-found'>Ничего не найдено</h3>
      )}
    </>
  );
}
export default MoviesCardList;
