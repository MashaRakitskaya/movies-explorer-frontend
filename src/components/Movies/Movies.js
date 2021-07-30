import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

function Movies({ onSearch }) {
  return (
    <>
      <Navigation />
      <SearchForm onSearch={onSearch} />

      <section className='movies'>
        <MoviesCardList />
      </section>
    </>
  );
}
export default Movies;
