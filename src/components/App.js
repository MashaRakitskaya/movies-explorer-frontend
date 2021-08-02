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
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [presenceFilms, setPresenceFilms] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((result) => {
        if (result.token) {
          setLoggedIn(true);
          localStorage.setItem("token", result.token);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((result) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err) {
          setError(true);
          console.log(err);
        }
      });
  }

  function getUserInformation() {
    MainApi.getUserInformation()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllMovies() {
    MoviesApi.getAllMovies()
      .then((result) => {
        setMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getSaveMovies = () => {
    MainApi.getSaveMovies()
      .then((result) => {
        setSavedMovies(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSearchMovies(data) {
    setPreloader(true);
    const filteredArray = movies
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

    if (filteredArray.length !== 0) {
      setPresenceFilms(true);
    } else {
      setPresenceFilms(false);
    }
    setFoundMovies(filteredArray);
    setTimeout(() => {
      // localStorage.setItem("foundMovies", JSON.stringify(filteredArray));
      setPreloader(false);
    }, 300);
  }

  useEffect(() => {
    if (loggedIn) {
      getUserInformation();
      getAllMovies();
      getSaveMovies();
    }
  }, [loggedIn, history]);

  const saveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSaveMovie = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;

    MainApi.deleteSaveMovie(movieId)
      .then((res) => {
        if (res.message === "Фильм удалён") {
          const newArray = savedMovies.filter((item) => item._id !== movieId);
          setSavedMovies([...newArray]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSaveHandler = (movie, added) =>
    added ? saveMovie(movie) : deleteSaveMovie(movie);

  const movieAdded = (movie) =>
    savedMovies.some((item) => item.movieId === movie.id);

  function handleTokenCheck() {
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
          history.push("/");
          console.log(`${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  // useEffect(() => {
  //   if (location.pathname === "/movies") {
  //     const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
  //     console.log(foundMovies);
  //     setShowFoundMovies(foundMovies);
  //   }
  // }, [location.pathname]);

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path={["/"]}>
            <Header loggedIn={loggedIn} />
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
              exact
              path='/movies'
              onSearch={handleSearchMovies}
              component={Movies}
              loggedIn={loggedIn}
              foundMovies={foundMovies}
              presenceFilms={presenceFilms}
              preloader={preloader}
              deleteSaveHandler={deleteSaveHandler}
              movieAdded={movieAdded}
            />

            <ProtectedRoute
              exact
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              deleteSaveHandler={deleteSaveHandler}
              movieAdded={movieAdded}
              savedMovies={savedMovies}
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
