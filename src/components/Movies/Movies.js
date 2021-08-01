import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

function Movies({ onSearch, foundMovies }) {
  return (
    <>
      <Navigation />
      <SearchForm onSearch={onSearch} />

      <section className='movies'>
        <MoviesCardList foundMovies={foundMovies} />
      </section>
    </>
  );
}
export default Movies;
