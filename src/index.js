import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'
import getIPFS from './util/ipfs/getIPFS'
import getLinnia from './util/linnia/getLinnia'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import SignUp from './user/layouts/signup/SignUp'
import Login from './user/layouts/login/Login'
import GetRecord from './user/layouts/getrecord/GetRecord'
import Search from './user/layouts/search/Search'

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
          <Route path="signup" component={SignUp} />
          <Route path="login" component={Login} />
          <Route path="get_record" component={GetRecord} />
          <Route path="search" component={Search} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
