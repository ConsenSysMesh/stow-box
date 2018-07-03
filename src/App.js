import React, { Component } from 'react'
import { Link } from 'react-router'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <span>
              <li className="pure-menu-item">
                <Link to="/get_record" className="pure-menu-link">Get Record</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/search" className="pure-menu-link">Search</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/permissions" className="pure-menu-link">Permissions</Link>
              </li>
            </span>
          </ul>
          <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
