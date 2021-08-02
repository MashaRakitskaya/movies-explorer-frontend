import React, { useState, useEffect } from "react";
import MoviesCard from "./MoviesCard";
import Preloader from "./Preloader";

function MoviesCardList({ foundMovies, preloader, deleteSaveHandler }) {
  const BIG_WIDTH = 1280;
  const MEDIUM_WIDTH = 780;
  const SMALL_WIDTH = 500;
  const [showFoundMovies, setShowFoundMovies] = useState([]);
  let count;

  function getQuantity(windowSize) {
    if (windowSize >= BIG_WIDTH) {
      return { first: 12, next: 3 };
    }
    if (windowSize > SMALL_WIDTH && windowSize <= MEDIUM_WIDTH) {
      return { first: 8, next: 2 };
    }
    if (windowSize < SMALL_WIDTH) {
      return { first: 5, next: 2 };
    }
    return { first: 12, next: 3 };
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
      {preloader && <Preloader />}
      <section className='movies-card-list'>
        {showFoundMovies.map((item) => {
          return (
            <MoviesCard
              card={item}
              key={item.id}
              deleteSaveHandler={deleteSaveHandler}
            />
          );
        })}
      </section>

      {showFoundMovies.length < foundMovies.length && (
        <div className='movies-card-list__box-button'>
          <button onClick={addMore} className='movies-card-list__button-more'>
            Еще
          </button>
        </div>
      )}
    </>
  );
}
export default MoviesCardList;
