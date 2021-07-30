import React from "react";
import arrow from "../../images/arrowsvg.svg";

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            href='https://github.com/MashaRakitskaya/how-to-learn'
            className='portfolio__list-item-anchor'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__list-title'>Статичный сайт</p>
            <img src={arrow} className='portfolio__list-img' alt='стрелка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://github.com/MashaRakitskaya/russian-travel'
            className='portfolio__list-item-anchor'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__list-title'>Адаптивный сайт</p>
            <img src={arrow} className='portfolio__list-img' alt='стрелка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://github.com/MashaRakitskaya/react-mesto-auth'
            className='portfolio__list-item-anchor'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__list-title'>Одностраничное приложение</p>
            <img src={arrow} className='portfolio__list-img' alt='стрелка' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
