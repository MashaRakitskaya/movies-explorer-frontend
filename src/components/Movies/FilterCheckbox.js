import React from "react";

function FilterCheckbox() {
  return (
    <div className='filter-check-box'>
      {/* <input
        className='filter-check-box__checkbox'
        id='checkbox'
        type='checkbox'
      ></input> */}
      <label className='filter-check-box__switch' htmlFor='checkbox'>
        <input
          className='filter-check-box__checkbox'
          type='checkbox'
          id='checkbox'
        />
        <div className='slider round'></div>
      </label>
      <p className='filter-check-box__checkbox-text'>Короткометражки</p>
    </div>
  );
}
export default FilterCheckbox;
