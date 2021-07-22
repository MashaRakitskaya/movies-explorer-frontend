import React from "react";

function Techs() {
  return (
    <section className='techs'>
      <h2 className='section-header'>Технологии</h2>
      <div className='techs__box'>
        <h1 className='techs__title'>7 технологий</h1>
        <p className='techs__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className='techs__list-box'>
          <ul className='techs__list'>
            <li className='techs__list-item'>HTML</li>
            <li className='techs__list-item'>CSS</li>
            <li className='techs__list-item'>JS</li>
            <li className='techs__list-item'>React</li>
            <li className='techs__list-item'>Git</li>
            <li className='techs__list-item'>Express.js</li>
            <li className='techs__list-item'>mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default Techs;
