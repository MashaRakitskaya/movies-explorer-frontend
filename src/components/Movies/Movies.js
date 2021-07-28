import React from "react";
import Navigation from "../Navigation";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";

function Movies() {
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
export default Movies;
