import React from "react";
import MoviesCard from "./MoviesCard";
// import Preloader from "./Preloader";

function MoviesCardList({ foundMovies }) {
  return (
    <>
      <div className='line'></div>
      <section className='movies-card-list'>
        {foundMovies.map((item) => {
          return <MoviesCard card={item} key={item.id} />;
        })}
      </section>
      {/* <Preloader /> */}
      <div className='movies-card-list__box-button'>
        <button className='movies-card-list__button-more'>Еще</button>
      </div>
    </>
  );
}
export default MoviesCardList;
