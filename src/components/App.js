import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Styles
import '../css/oswald.css';
import '../css/open-sans.css';
import '../css/pure-min.css';
import '../css/App.css';

// Layouts
import Home from './Home';
import Header from './Header';
import GetRecord from './GetRecord';
import Search from './Search';
import Permission from './Permissions';

import ProtectedRoute from './ProtectedRoute';

const history = createHistory({
  basename: '',
});

class App extends Component {
  componentDidMount () {
    this.props.authenticate();
  }

  render () {
    const { isAuthenticated, authError } = this.props;

    return (
      <div className='App'>
        <Header history={history} />
        <Router history={history}>
          <Switch>
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/get_record'
              authError={authError}
              component={GetRecord}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/search'
              authError={authError}
              component={Search}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/permissions'
              authError={authError}
              component={Permission}
            />
            <Route
              exact
              path='*'
              render={() => <Home authError={authError} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
