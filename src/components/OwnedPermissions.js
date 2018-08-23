import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission';
import Typography from '@material-ui/core/Typography';

class OwnedPermissions extends Component {
  render () {
    const { permissions, revokePermission } = this.props;

    return (
      <div>
        <Typography variant='title'>
          Owned Permissions
        </Typography>
        {permissions.map((permission, i) => <Permission
          permission={permission}
          key={i}
          revoke={revokePermission}
        />)}
      </div>
    );
  }
}

OwnedPermissions.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  revokePermission: PropTypes.func.isRequired,
};

export default OwnedPermissions;
