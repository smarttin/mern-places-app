import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useCallback } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
      setIsLoggedIn(true);
      setUserId(uid);
    },
    [],
  )

  const logout = useCallback(() => {
      setIsLoggedIn(false);
      setUserId()
    },
    [],
  )

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout, userId: userId}}>
      <Router>
      <MainNavigation />
        <main>
          {routes}        
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
