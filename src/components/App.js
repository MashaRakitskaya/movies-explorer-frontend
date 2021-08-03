import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
  const [error, setError] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [foundSaveMovies, setFoundSaveMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [presenceFilms, setPresenceFilms] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  //РЕГИСТРАЦИЯ
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
        console.log(err);
      });
  }
  //ЛОГИН
  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err) {
          setError(true);
          console.log(err);
        }
      });
  }

  //ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕТЕ
  function getUserInformation() {
    MainApi.getUserInformation()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //ПОЛУЧИТЬ ВСЕ ФИЛЬМЫ
  function getAllMovies() {
    MoviesApi.getAllMovies()
      .then((result) => {
        setAllMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const getSaveMovies = () => {
    MainApi.getSaveMovies()
      .then((result) => {
        const currentUserSavedMovies = result.filter((m) => {
          return m.owner === currentUser._id;
        });
        setSavedMovies(currentUserSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ПОИСК
  function handleSearchMovies(data) {
    setPreloader(true);

    const filteredArray = arrey
      .filter((obj) => {
        return (
          obj.description?.toLowerCase().includes(data.toLowerCase()) ||
          obj.director?.toLowerCase().includes(data.toLowerCase()) ||
          obj.nameEN?.toLowerCase().includes(data.toLowerCase()) ||
          obj.nameRU?.toLowerCase().includes(data.toLowerCase())
        );
      })
      .map((obj) => {
        return obj;
      });
    console.log(arrey);

    if (filteredArray.length !== 0) {
      setPresenceFilms(true);
    } else {
      setPresenceFilms(false);
    }

    if (location.pathname === "/movies") {
      setFoundMovies(filteredArray);
    } else if (location.pathname === "/saved-movies") {
      setSavedMovies(filteredArray);
      // setFoundSaveMovies(filteredArray);
    }
    setTimeout(() => {
      setPreloader(false);
    }, 300);
  }
  //смотря какой путь будет поиск по разным массивам
  useEffect(() => {
    if (location.pathname === "/movies") {
      setArrey(allMovies);
      console.log(arrey);
    } else if (location.pathname === "/saved-movies") {
      setArrey(savedMovies);
      console.log(savedMovies);
    }
  }, [location.pathname, allMovies, savedMovies, arrey]);

  //ВЫЗВАТЬ ВСЕ ФМЛЬМЫ, СОХРАНЕННЫЕ ФИЛЬМЫ И ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ
  useEffect(() => {
    if (loggedIn) {
      getUserInformation();
      getAllMovies();
      getSaveMovies();
    }
  }, [loggedIn, history]);

  //СОХРАНИТЬ ФИЛЬМ
  const saveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //УДАЛИТЬ ФИЛЬМ
  const deleteMovie = (movie) => {
    const movieId = savedMovies.find((item) => item._id === movie.id)._id;
    MainApi.deleteSaveMovie(movieId)
      .then((res) => {
        if (res.message === "Фильм удалён") {
          const newArray = savedMovies.filter((item) => {
            item._id !== movieId;
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

  const movieAdded = (movie) =>
    savedMovies.some((item) => item.movieId === movie.id);

  //ПРОВЕРКА ТОКЕНА
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

  //ВЫХОД
  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setFoundSaveMovies([]);
    setFoundMovies([]);
    setAllMovies([]);
    setArrey([]);
    setCurrentUser({});
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
              <Register error={error} onRegister={handleRegister} />
            </Route>
            <Route path='/signin'>
              <Login onLogin={handleLogin} />
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
              presenceFilms={presenceFilms}
              foundSaveMovies={foundSaveMovies}
              preloader={preloader}
            />

            <ProtectedRoute
              loggedIn={loggedIn}
              exact
              path='/profile'
              component={Profile}
              signOut={handleSignOut}
            />

            <Route path='/404'>
              <PageNotFound />
            </Route>
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
