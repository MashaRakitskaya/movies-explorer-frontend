import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute.js";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main/Main";
import Footer from "./Footer";
import Movies from "./Movies/Movies";
import PageNotFound from "./PageNotFound";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile";
import * as MainApi from "../utils/MainApi";
import * as MoviesApi from "../utils/MoviesApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [errorProfile, setErrorProfile] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [preloader, setPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  // const [preloader, setPreloader] = useState(false);
  const [presenceFilms, setPresenceFilms] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  // ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.checkToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          history.push("/signin");
          console.log(`${err}`);
        });
    }
  }, []);

  // РЕГИСТРАЦИЯ
  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setErrorSignIn(true);
        console.log(err);
      });
  }

  // ЛОГИН
  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err) {
          setErrorSignUp(true);
          console.log(err);
        }
      });
  }

  // // смотря какой путь будет поиск по разным массивам
  // useEffect(() => {
  //   if (location.pathname === "/movies") {
  //     setArrey(allMovies);

  //     const foundString = localStorage.getItem("string");

  //     if (foundString && !foundMovies.length) {
  //       handleSearchMovies(foundString);
  //     }
  //   } else if (location.pathname === "/saved-movies") {
  //     setArrey(arrey.length ? arrey : [...savedMovies]);
  //   }
  // }, [location.pathname, allMovies]);

  // // ПОИСК
  // function handleSearchMovies(data) {
  //   setPreloader(true);
  //   const filteredArray = arrey.filter((obj) => {
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

  //   if (location.pathname === "/movies") {
  //     setFoundMovies(filteredArray);
  //     localStorage.setItem("string", data);
  //   } else if (location.pathname === "/saved-movies") {
  //     setSavedMovies(filteredArray);
  //   }

  //   setTimeout(() => {
  //     setPreloader(false);
  //   }, 300);
  // }

  //ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ ВСЕ ФИЛЬМЫ И СОХРАНЕННЫЕ
  useEffect(() => {
    setPreloader(true);
    if (loggedIn) {
      Promise.all([
        MainApi.getUserInformation(),
        MoviesApi.getAllMovies(),
        MainApi.getSaveMovies(),
      ])
        .then(([userInf, allMovies, saveMovies]) => {
          setCurrentUser(userInf);
          setAllMovies(allMovies);
          const currentUserSavedMovies = saveMovies.filter((m) => {
            return m.owner == currentUser._id;
          });
          setSavedMovies(currentUserSavedMovies);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [loggedIn, currentUser._id]);

  // СОХРАНИТЬ ФИЛЬМ
  const saveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        // setSavedMovies(res);
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // УДАЛИТЬ ФИЛЬМ
  const deleteMovie = (movie) => {
    const movieId = movie._id
      ? movie._id
      : savedMovies.find((item) => {
          return item.movieId === movie.id;
        })._id;

    MainApi.deleteSaveMovie(movieId)
      .then((res) => {
        if (res.message === "Фильм удалён") {
          const newArray = savedMovies.filter((item) => {
            return item._id !== movieId;
          });
          setSavedMovies([...newArray]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleLikeHandler = (movie, added) =>
    added ? saveMovie(movie) : deleteMovie(movie);

  const movieAdded = (movie) => {
    return savedMovies.find((item) => {
      return movie._id ? item._id === movie._id : item.movieId === movie.id;
    });
  };

  function handleSearchMovies(data) {
    setPreloader(true);
    const filteredArray = allMovies.filter((obj) => {
      return (
        obj.description?.toLowerCase().includes(data.toLowerCase()) ||
        obj.director?.toLowerCase().includes(data.toLowerCase()) ||
        obj.nameEN?.toLowerCase().includes(data.toLowerCase()) ||
        obj.nameRU?.toLowerCase().includes(data.toLowerCase())
      );
    });

    if (filteredArray.length !== 0) {
      setPresenceFilms(true);
    } else {
      setPresenceFilms(false);
    }

    setFoundMovies(filteredArray);
    localStorage.setItem("allMovies", JSON.stringify(filteredArray));

    setTimeout(() => {
      setPreloader(false);
    }, 300);
  }

  useEffect(() => {
    const allMoviesArrey = JSON.parse(localStorage.getItem("allMovies"));
    setPresenceFilms(true);
    return setFoundMovies(allMoviesArrey);
  }, []);

  //редактирование профиля
  function editUserInfo({ name, email }) {
    setPreloader(true);
    MainApi.editUserInfo({ name: name, email: email })
      .then((res) => {
        setErrorProfile(false);
        setCurrentUser(res);
      })
      .catch((err) => {
        setErrorProfile(true);
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  // ВЫХОД
  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setAllMovies([]);
    setCurrentUser({});
    localStorage.removeItem("allMovies");
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
            <Header loggedIn={loggedIn} />
          </Route>

          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>

            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              toggleLikeHandler={toggleLikeHandler}
              movieAdded={movieAdded}
              savedMovies={savedMovies}
              allMovies={allMovies}
              handleSearchMovies={handleSearchMovies}
              preloader={preloader}
              presenceFilms={presenceFilms}
              foundMovies={foundMovies}
            />

            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              toggleLikeHandler={toggleLikeHandler}
              movieAdded={movieAdded}
              savedMovies={savedMovies}
              preloader={preloader}
            />

            <ProtectedRoute
              path='/profile'
              errorProfile={errorProfile}
              loggedIn={loggedIn}
              component={Profile}
              editUserInfo={editUserInfo}
              signOut={handleSignOut}
              preloader={preloader}
            />

            <Route path='/signup'>
              <Register error={errorSignUp} onRegister={handleRegister} />
            </Route>
            <Route path='/signin'>
              <Login error={errorSignIn} onLogin={handleLogin} />
            </Route>

            <Route path='/404'>
              <PageNotFound />
            </Route>
            <Redirect to='/404' />
          </Switch>

          <Route exact path={["/", "/movies", "/saved-movies"]}>
            <Footer />
          </Route>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
