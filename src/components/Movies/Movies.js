import React, { useState, useEffect } from "react";
import MoviesCardList from "./MoviesCardList";
import SearchForm from "./SearchForm";
import { DURATION_MOVIE } from "../../utils/constants";
import Preloader from "./Preloader";

function Movies({
  toggleLikeHandler,
  movieAdded,
  savedMovies,
  allMovies,
  handleSearchMovies,
  preloader,
  presenceFilms,
  foundMovies,
}) {
  const [filter, setfilter] = useState(false);
  // const [preloader, setPreloader] = useState(false);
  // const [presenceFilms, setPresenceFilms] = useState(false);
  // const [foundMovies, setFoundMovies] = useState([]);
  const filterMovies = (movies) =>
    movies.filter((item) => {
      return item.duration < DURATION_MOVIE;
    });

  const onFilter = () => {
    setfilter(!filter);
  };

  // function handleSearchMovies(data) {
  //   setPreloader(true);
  //   const filteredArray = allMovies.filter((obj) => {
  //     return (
  //       obj.description?.toLowerCase().includes(data.toLowerCase()) ||
  //       obj.director?.toLowerCase().includes(data.toLowerCase()) ||
  //       obj.nameEN?.toLowerCase().includes(data.toLowerCase()) ||
  //       obj.nameRU?.toLowerCase().includes(data.toLowerCase())
  //     );
  //   });

  //   if (filteredArray.length !== 0) {
  //     setPresenceFilms(true);
  //   } else {
  //     setPresenceFilms(false);
  //   }

  //   setFoundMovies(filteredArray);
  //   localStorage.setItem("allMovies", JSON.stringify(filteredArray));

  //   setTimeout(() => {
  //     setPreloader(false);
  //   }, 300);
  // }

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <SearchForm onSearch={handleSearchMovies} onFilter={onFilter} />

          <section className='movies'>
            {presenceFilms ? (
              <MoviesCardList
                foundMovies={filter ? filterMovies(foundMovies) : foundMovies}
                preloader={preloader}
                toggleLikeHandler={toggleLikeHandler}
                savedMovies={savedMovies}
                movieAdded={movieAdded}
              />
            ) : (
              <h3 className='text-nothing-found'>Ничего не найдено</h3>
            )}
          </section>
        </>
      )}
    </>
  );
}
export default Movies;
