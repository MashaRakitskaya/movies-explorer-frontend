import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

function Movies() {
  return (
    <>
      <Navigation />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList />
      </section>
    </>
  );
}
export default Movies;
