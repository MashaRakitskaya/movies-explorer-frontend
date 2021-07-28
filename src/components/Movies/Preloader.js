import React from "react";
import spinner from "../../images/spiner.svg";

function Preloader() {
  return (
    <div className='loading-container'>
      <img className='spinner rotation' src={spinner} alt='Спинер' />
    </div>
  );
}

export default Preloader;
