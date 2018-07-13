import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Permission from './Permission'

class OwnedPermissions extends Component {
  render () {
    const { permissions, revokePermission } = this.props

    return (
      <div className='permissions inline-block'>
        <h2>Owned Permissions</h2>
        {permissions.map((permission, i) => <Permission
          permission={permission}
          key={i}
          revoke={revokePermission}
        />)}
      </div>
    )
  }
}

OwnedPermissions.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  revokePermission: PropTypes.func.isRequired,
}

export default OwnedPermissions
