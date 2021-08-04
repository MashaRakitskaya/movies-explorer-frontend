import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "../Movies/SearchForm";
import { DURATION_MOVIE } from "../../utils/constants";

function SavedMovies({
  toggleLikeHandler,
  movieAdded,
  savedMovies,
  onSearch,
  preloader,
}) {
  const [showFoundMovies, setShowFoundMovies] = useState([]);

  useEffect(() => {
    setShowFoundMovies(savedMovies);
  }, [savedMovies]);

  const [filter, setfilter] = useState(false);
  const filterMovies = (movies) =>
    movies.filter((item) => item.duration < DURATION_MOVIE);

  const onFilter = () => {
    setfilter(!filter);
  };
  return (
    <>
      <Navigation />
      <SearchForm onSearch={onSearch} onFilter={onFilter} />
      <section className='movies'>
        {showFoundMovies.length !== 0 ? (
          <MoviesCardList
            movieAdded={movieAdded}
            preloader={preloader}
            showFoundMovies={
              filter ? filterMovies(showFoundMovies) : showFoundMovies
            }
            toggleLikeHandler={toggleLikeHandler}
          />
        ) : (
          <h3>Ничего не найдено</h3>
        )}
      </section>
    </>
  );
}
export default SavedMovies;
