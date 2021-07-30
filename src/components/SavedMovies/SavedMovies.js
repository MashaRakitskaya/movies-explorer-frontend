import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "../Movies/SearchForm";

function SavedMovies() {
  return (
    <>
      <Navigation />
      <SearchForm />
      <section className='movies'>
        <MoviesCardList />
      </section>
    </>
  );
}
export default SavedMovies;
