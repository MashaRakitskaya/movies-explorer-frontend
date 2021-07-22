import React from "react";
import landinglogo from "../../images/landing-logo.svg";

function NavTab() {
  return (
    <section className='navtab'>
      <div className='navtab__container'>
        <h1 className='navtab__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='navtab__text'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className='navtab__button'>Узнать больше</button>
      </div>

      <img
        className='navtab__img'
        src={landinglogo}
        alt='Планета из слов web'
      />
    </section>
  );
}
export default NavTab;
