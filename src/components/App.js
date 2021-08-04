import React, { useState, useEffect, useCallback } from "react";
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
  const [arrey, setArrey] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [presenceFilms, setPresenceFilms] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  // РЕГИСТРАЦИЯ
  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLoggedIn(true);
          getUserInformation();
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

  // ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕТЕ
  function getUserInformation() {
    MainApi.getUserInformation()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ПОЛУЧИТЬ ВСЕ ФИЛЬМЫ
  function getAllMovies() {
    MoviesApi.getAllMovies()
      .then((result) => {
        setAllMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const getSaveMovies = useCallback(
    function () {
      MainApi.getSaveMovies()
        .then((result) => {
          // выводим только собственные фильмы сохраненные
          const currentUserSavedMovies = result.filter((m) => {
            return m.owner == currentUser._id;
          });
          setSavedMovies(currentUserSavedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [currentUser]
  );

  // смотря какой путь будет поиск по разным массивам
  useEffect(() => {
    if (location.pathname === "/movies") {
      setArrey(allMovies);

      const foundString = localStorage.getItem("string");

      if (foundString && !foundMovies.length) {
        handleSearchMovies(foundString);
      }
    } else if (location.pathname === "/saved-movies") {
      setArrey(arrey.length ? arrey : [...savedMovies]);
    }
  }, [location.pathname, allMovies]);

  // ПОИСК
  function handleSearchMovies(data) {
    setPreloader(true);
    const filteredArray = arrey.filter((obj) => {
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

    if (location.pathname === "/movies") {
      setFoundMovies(filteredArray);
      localStorage.setItem("string", data);
    } else if (location.pathname === "/saved-movies") {
      setSavedMovies(filteredArray);
    }

    setTimeout(() => {
      setPreloader(false);
    }, 300);
  }

  // ВЫЗВАТЬ ВСЕ ФМЛЬМЫ, СОХРАНЕННЫЕ ФИЛЬМЫ И ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ
  useEffect(() => {
    getUserInformation();
    getAllMovies();
    getSaveMovies();
  }, [location.pathname]);

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

  function editUserInfo({ name, email }) {
    MainApi.editUserInfo({ name: name, email: email })
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          setLoggedIn(false);
          localStorage.removeItem("token");
          history.push("/signin");
          console.log(`${err}`);
        });
    }
  }, []);

  // ВЫХОД
  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setFoundMovies([]);
    setAllMovies([]);
    setArrey([]);
    setCurrentUser({});
    setPresenceFilms(false);
    localStorage.removeItem("string");
    history.push("/signin");
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={["/"]}>
            <Header />
          </Route>

          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/signup'>
              <Register error={errorSignUp} onRegister={handleRegister} />
            </Route>
            <Route path='/signin'>
              <Login error={errorSignIn} onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              path='/movies'
              onSearch={handleSearchMovies}
              component={Movies}
              loggedIn={loggedIn}
              foundMovies={foundMovies}
              presenceFilms={presenceFilms}
              preloader={preloader}
              toggleLikeHandler={toggleLikeHandler}
              movieAdded={movieAdded}
              savedMovies={savedMovies}
            />

            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              toggleLikeHandler={toggleLikeHandler}
              movieAdded={movieAdded}
              savedMovies={savedMovies}
              onSearch={handleSearchMovies}
              preloader={preloader}
            />

            <ProtectedRoute
              path='/profile'
              loggedIn={loggedIn}
              component={Profile}
              editUserInfo={editUserInfo}
              signOut={handleSignOut}
            />

            <Route path='/404'>
              <PageNotFound />
            </Route>
            <Redirect to='/404' />
          </Switch>
          <Route exact path={["/", "/movies", "/saved-movies"]}>
            <Footer />
          </Route>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
export default App;
