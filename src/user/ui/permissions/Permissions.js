import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddPermission from './AddPermission'
import OwnedPermissions from './OwnedPermissions'
import CircularProgress from '@material-ui/core/CircularProgress'

const progressStyle = {
  color: 'black',
}

class Permissions extends Component {
  componentDidMount () {
    this.props.getPermissions()
  }

  render () {
    const {
      permissions,
      revokePermission,
      addPermission,
      errorMessage,
      clearPermissionsError,
      isLoading,
    } = this.props

    return (
      <div>
        {errorMessage && <h2 className='error'>{errorMessage}</h2>}
        {isLoading && <div>
          <div className='progress-background' />
          <CircularProgress className='progress' style={progressStyle} thickness={7} />
        </div>}
        <AddPermission
          addPermission={addPermission}
          clearPermissionsError={clearPermissionsError}
        />
        <OwnedPermissions
          permissions={permissions}
          revokePermission={revokePermission}
        />
      </div>
    )
  }
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object),
  getPermissions: PropTypes.func.isRequired,
  revokePermission: PropTypes.func.isRequired,
  addPermission: PropTypes.func.isRequired,
  clearPermissionsError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default Permissions
