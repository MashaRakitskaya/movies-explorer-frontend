import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList() {
  return (
    <>
      <div className='line'></div>
      <section className='movies-card-list'>
        <MoviesCard />
      </section>
      <div className='movies-card-list__box-button'></div>
    </>
  );
}
export default MoviesCardList;
