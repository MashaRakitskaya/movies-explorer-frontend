import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Main from "./Main/Main";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <div className="page__container">
        {/* <CurrentUserContext.Provider> */}
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>
        </Switch>

        {/* </CurrentUserContext.Provider> */}
      </div>
    </div>
  );
}
export default App;
