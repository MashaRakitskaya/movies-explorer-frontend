import React from "react";
import avatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section-header'>Студент</h2>
      <div className='about-me__box'>
        <div className='about-me__container'>
          <h2 className='about-me__name'>Мария</h2>
          <h2 className='about-me__profession'>Web-developer, 24 года</h2>
          <p className='about-me__description'>
            Родилась в Беларуси живу в городе Минск, закончила факультет
            экологической-медицины МГЭИ БГУ. Есть муж. Любовь к саморазвитию
            привела меня в мир веб-дизайна и в последствии в веб-разработку. В
            сентябре 2020 года пошла на курсы разработки. Через пол года нашла
            работу и очень рада что можно продолжать учиться и работать.
            Планирую пройти курсы мидл фронтен разработчика.
          </p>
          <div className='about-me__networks'>
            <a
              href='https://www.linkedin.com/in/rakitskaya/'
              target='_blank'
              className='about-me__networks-item'
              rel='noreferrer'
            >
              LinkedIn
            </a>
            <a
              href='https://github.com/MashaRakitskaya'
              target='_blank'
              className='about-me__networks-item'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>

        <img className='about-me__img' src={avatar} alt='аватар Марии' />
      </div>
    </section>
  );
}
export default AboutMe;
