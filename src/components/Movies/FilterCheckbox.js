import React from "react";

function FilterCheckbox({ onFilter }) {
  return (
    <div className='filter-check-box'>
      <label className='filter-check-box__switch' htmlFor='checkbox'>
        <input
          className='filter-check-box__checkbox'
          type='checkbox'
          id='checkbox'
          onClick={onFilter}
        />
        <div className='slider round'></div>
      </label>
      <p className='filter-check-box__checkbox-text'>Короткометражки</p>
    </div>
  );
}
export default FilterCheckbox;
