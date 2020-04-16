import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import Users from './user/places/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';

const App = () => {
  return (
    <Router>
      <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/:userId/places" exact component={UserPlaces} />
            <Route path="/places/new" exact component={NewPlace} />
            <Route path="/places/:placeId" exact component={UpdatePlace} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
        </main>
    </Router>
  );
}

export default App;
