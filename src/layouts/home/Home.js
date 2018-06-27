import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Linnia as a decentralized backend</h2>
            <p>TODO, text about linnia and link to the public documentation</p>
            <h2>Metamask Authentication</h2>
            <p>This particular box comes with autentication via Metamask.</p>
            <h3>Further Reading</h3>
            <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
