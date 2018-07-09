import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Styles
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

// Layouts
import Home from './layouts/home/Home';
import Header from './layouts/header/Header';
import GetRecord from './user/layouts/getrecord/GetRecord';
import Search from './user/layouts/search/Search';

import ProtectedRoute from './ProtectedRoute';

const history =  createHistory({
  basename: ''
});

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    const { isAuthenticated, authError } = this.props;

    return (
      <div className="App">
        <Header authError={authError} history={history}/>
          <Router history={history}>
          <Switch>
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/get_record" component={GetRecord} />
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/search" component={Search} />
            <Route exact path="*" render={() => <Home authError={authError}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;