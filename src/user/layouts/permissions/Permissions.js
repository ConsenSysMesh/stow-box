import React, { Component } from 'react'
import PermissionsContainer from '../../ui/permissions/PermissionsContainer'

class Permissions extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Permissions</h1>
            <PermissionsContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Permissions