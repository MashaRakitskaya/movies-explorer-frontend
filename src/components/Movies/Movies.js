import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

function Movies({
  onSearch,
  loggedIn,
  foundMovies,
  presenceFilms,
  preloader,
  deleteSaveHandler,
}) {
  return (
    <>
      {loggedIn && <Navigation />}
      <SearchForm onSearch={onSearch} />

      <section className='movies'>
        {presenceFilms ? (
          <MoviesCardList
            foundMovies={foundMovies}
            preloader={preloader}
            deleteSaveHandler={deleteSaveHandler}
          />
        ) : (
          <h3>Ничего не найдено</h3>
        )}
      </section>
    </>
  );
}
export default Movies;
