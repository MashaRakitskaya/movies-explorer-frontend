import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "../Movies/SearchForm";

function SavedMovies({
  toggleLikeHandler,
  movieAdded,
  savedMovies,
  onSearch,
  presenceFilms,
  foundSaveMovies,
  preloader,
}) {
  return (
    <>
      <Navigation />
      <SearchForm onSearch={onSearch} />
      <section className='movies'>
        {savedMovies.length !== 0 ? (
          <MoviesCardList
            movieAdded={movieAdded}
            preloader={preloader}
            foundSaveMovies={foundSaveMovies}
            savedMovies={savedMovies}
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
