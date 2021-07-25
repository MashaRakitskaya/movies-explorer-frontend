import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main/Main";
import Footer from "./Footer";

function App() {
  const [loggedIn] = useState(false);

  return (
    <div className='page'>
      <div className='page__container'>
        {/* <CurrentUserContext.Provider> */}
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
        </Switch>
        <Route exact path={["/"]}>
          <Footer />
        </Route>

        {/* </CurrentUserContext.Provider> */}
      </div>
    </div>
  );
}
export default App;
