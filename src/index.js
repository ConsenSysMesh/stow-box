import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
import getIPFS from './util/ipfs/getIPFS'
import getLinnia from './util/linnia/getLinnia'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import Login from './user/layouts/login/Login'
import GetRecord from './user/layouts/getrecord/GetRecord'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
  // Initialize ipfs and set in Redux.
  getIPFS
  .then(results => {
    console.log('IPFS initialized!')
    // Initialize linnia and set in Redux.
    getLinnia
    .then(results => {
      console.log('Linnia initialized!')
    })
    .catch(() => {
      console.log('Error in Linnia initialization.')
    })
  })
  .catch(() => {
    console.log('Error in IPFS initialization.')
  })
})
.catch(() => {
  console.log('Error in web3 initialization.')
})


ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="login" component={UserIsNotAuthenticated(Login)} />
          <Route path="get_record" component={UserIsAuthenticated(GetRecord)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
