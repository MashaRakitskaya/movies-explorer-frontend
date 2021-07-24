import React from "react";

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__year'>© 2021</p>
        <ul className='footer__list'>
          <li className='footer__list-item'>
            <a
              href='https://praktikum.yandex.ru/'
              className='footer__list-item-anchor'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__list-item'>
            <a
              href='https://github.com/MashaRakitskaya'
              target='_blank'
              rel='noreferrer'
              className='footer__list-item-anchor'
            >
              Github
            </a>
          </li>
          <li className='footer__list-item'>
            <a
              href='https://www.linkedin.com/in/rakitskaya/'
              target='_blank'
              rel='noreferrer'
              className='footer__list-item-anchor'
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
