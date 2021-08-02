import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "../Movies/SearchForm";

function SavedMovies({ deleteSaveHandler, movieAdded }) {
  return (
    <>
      <Navigation />
      <SearchForm />
      <section className='movies'>
        <MoviesCardList deleteSaveHandler={deleteSaveHandler} />
      </section>
    </>
  );
}
export default SavedMovies;
