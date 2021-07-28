import React from "react";
import MoviesCard from "./MoviesCard";
// import spinner from "../../images/spiner.svg";

function MoviesCardList() {
  return (
    <>
      <div className='line'></div>
      <section className='movies-card-list'>
        <MoviesCard />
      </section>
      {/* <div className='loading-container'>
        <img className='spinner rotation' src={spinner} alt='Спинер' />
      </div> */}
      <div className='movies-card-list__box-button'>
        <button className='movies-card-list__button-more'>Еще</button>
      </div>
    </>
  );
}
export default MoviesCardList;
