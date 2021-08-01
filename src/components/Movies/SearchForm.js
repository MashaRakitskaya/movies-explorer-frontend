import React, { useState } from "react";
import FilterCheckbox from "./FilterCheckbox";
import rearch from "../../images/search.svg";

function SearchForm({ onSearch }) {
  const [data, setdata] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setdata(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    onSearch(data);
  };

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form' noValidate onSubmit={handleSubmit}>
          <img
            className='search-form__rearch-img'
            src={rearch}
            alt='Лупа'
          ></img>
          <input
            onChange={handleInput}
            placeholder='Фильм'
            className='search-form__input'
          ></input>
          <button type='submit' className='search-form__button'></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}
export default SearchForm;
