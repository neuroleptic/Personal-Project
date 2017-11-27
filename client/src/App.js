import React, { Component } from 'react';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import Register from './components/Register';
import StringsList from './components/StringsList';
import AddString from './components/AddString';
import StringDetail from './components/StringDetail';
import StringDetailEdit from './components/StringDetailEdit';
import EditReview from './components/EditReview';
import AddReview from './components/AddReview';

import { Switch, Route, Redirect  } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/strings"/> )}/>
          <Route exact path="/strings" component={ StringsList }/>
          <Route exact path="/strings/new" component={ AddString }/>
          <Route exact path="/strings/:id" component={ StringDetail }/>
          <Route exact path="/strings/:id/reviews/new" component={ AddReview }/>
          <Route exact path="/strings/:id/reviews/:reviewId" component={ EditReview }/>
          <Route exact path="/strings/:id/edit" component={ StringDetailEdit }/>
          <Route exact path="/login" component={ LogIn }/>
          <Route exact path="/logout" component={ LogOut }/>
          <Route exact path="/register" component={ Register }/>
        </Switch>
      </div>
    );
  }
}

export default App;
