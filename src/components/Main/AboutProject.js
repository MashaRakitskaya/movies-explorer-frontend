import React from "react";

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='section-header'>О проекте</h2>
      <div className='about-project__box'>
        <div className='about-project__container'>
          <h3 className='about-project__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__container'>
          <h3 className='about-project__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='time-line'>
        <div className='time-line__backend-part'>
          <p className='time-line__first-week'>1 неделя</p>
          <p className='time-line__backend'>Back-end</p>
        </div>
        <div className='time-line__frontend-part'>
          <p className='time-line__four-weeks'>4 недели</p>
          <p className='time-line__frontend'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;
