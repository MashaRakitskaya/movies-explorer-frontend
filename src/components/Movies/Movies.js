import React, { useState } from "react";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";
import { DURATION_MOVIE } from "../../utils/constants";
import Preloader from "./Preloader";

function Movies({
  toggleLikeHandler,
  movieAdded,
  savedMovies,
  handleSearchMovies,
  preloader,
  presenceFilms,
  foundMovies,
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
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <SearchForm onSearch={handleSearchMovies} onFilter={onFilter} />

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
              <h3 className='text-nothing-found'>Ничего не найдено</h3>
            )}
          </section>
        </>
      )}
    </>
  );
}
export default Movies;
