import React, { useState } from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";
import { DURATION_MOVIE } from "../../utils/constants";

function Movies({
  onSearch,
  loggedIn,
  foundMovies,
  presenceFilms,
  preloader,
  toggleLikeHandler,
  movieAdded,
  savedMovies,
}) {
  const [filter, setfilter] = useState(false);
  const filterMovies = (movies) =>
    movies.filter((item) => {
      return item.duration < DURATION_MOVIE;
    });

  const onFilter = () => {
    setfilter(!filter);
  };

  return (
    <>
      {loggedIn && <Navigation />}
      <SearchForm onSearch={onSearch} onFilter={onFilter} />

      <section className='movies'>
        {presenceFilms ? (
          <MoviesCardList
            foundMovies={filter ? filterMovies(foundMovies) : foundMovies}
            preloader={preloader}
            toggleLikeHandler={toggleLikeHandler}
            savedMovies={savedMovies}
            movieAdded={movieAdded}
          />
        ) : (
          <h3>Ничего не найдено</h3>
        )}
      </section>
    </>
  );
}
export default Movies;
