import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import Users from './user/places/Users';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/places/new" exact component={NewPlace} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
