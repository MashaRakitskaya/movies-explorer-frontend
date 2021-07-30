import React from "react";
import FilterCheckbox from "./FilterCheckbox";
import rearch from "../../images/search.svg";

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form'>
          <img
            className='search-form__rearch-img'
            src={rearch}
            alt='Лупа'
          ></img>
          <input placeholder='Фильм' className='search-form__input'></input>
          <button className='search-form__button'></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}
export default SearchForm;
