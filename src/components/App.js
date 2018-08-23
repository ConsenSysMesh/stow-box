import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import ProtectedRoute from './ProtectedRoute';

// Styles
import '../css/App.css';

// Components
import Home from './Home';
import Header from './Header';
import GetRecord from './../containers/GetRecordContainer';
import Search from './../containers/SearchContainer';
import Permission from './../containers/PermissionsContainer';

const history = createHistory({
  basename: '',
});

const styles = {
  main: {
    padding: 100,
    paddingTop: 40,
  },
};

class App extends Component {
  componentDidMount () {
    this.props.authenticate();
  }

  render () {
    const { isAuthenticated, authError, classes } = this.props;

    return (
      <div>
        <Header history={history} />
        <Router history={history}>
          <main className={classes.main}>
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
                component={Home}
              />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
