import React, { Component } from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';

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

import AuthError from './auth/authError/AuthError';
import ProtectedRoute from './ProtectedRoute';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    const { isAuthenticated, authError } = this.props;

    return (
      <div className="App">
        <Header />
        <Router history={history}>
          <ProtectedRoute isAuthenticated={isAuthenticated} path="/" component={Home} />
          <ProtectedRoute isAuthenticated={isAuthenticated} path="get_record" component={GetRecord} />
          <ProtectedRoute isAuthenticated={isAuthenticated} path="search" component={Search} />
        </Router>
      </div>
    );
  }
}

export default App;