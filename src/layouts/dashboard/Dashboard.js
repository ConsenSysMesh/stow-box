import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Hello {this.props.authData.name}!</strong></p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
