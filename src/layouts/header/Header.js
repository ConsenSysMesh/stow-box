import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <nav className="navbar pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list navbar-right">
          <span>
            <li className="pure-menu-item">
              <Link to="/get_record" className="pure-menu-link">Get Record</Link>
            </li>
            <li className="pure-menu-item">
              <Link to="/search" className="pure-menu-link">Search</Link>
            </li>
          </span>
        </ul>
        <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
      </nav>
    );
  }
}

export default Header;
