import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main/Main";
import Footer from "./Footer";
import Movies from "./Movies/Movies";
import PageNotFound from "./PageNotFound";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile";

function App() {
  const [loggedIn] = useState(false);

  return (
    <div className='page'>
      <div className='page__container'>
        <Route exact path={["/"]}>
          <Header loggedIn={loggedIn} />
        </Route>

        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>
          <Route path='/signin'>
            <Login />
          </Route>
          <Route exact path='/movies'>
            <Movies />
          </Route>
          <Route exact path='/saved-movies'>
            <SavedMovies />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>

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
