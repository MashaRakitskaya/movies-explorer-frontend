import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
  const history = useHistory();

  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((result) => {
        localStorage.setItem("token", result.token);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((result) => {
        if (result) {
          console.log("df");
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
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

  function handleSearchMovies() {
    movies;
  }

  useEffect(() => {
    if (loggedIn) {
      getUserInformation();
      getAllMovies();
    }
  }, [loggedIn]);

  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.checkToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          history.push("/signin");
          console.log(`${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='page'>
      <div className='page__container'>
        <CurrentUserContext.Provider
          value={currentUser}
        ></CurrentUserContext.Provider>
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
          />

          <ProtectedRoute exact path='/saved-movies' component={SavedMovies} />

          <ProtectedRoute exact path='/profile' component={Profile} />

          <Route path='/404'>
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={["/", "/movies", "/saved-movies"]}>
          <Footer />
        </Route>
      </div>
    </div>
  );
}
export default App;
