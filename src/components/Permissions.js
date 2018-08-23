import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddPermission from './AddPermission';
import OwnedPermissions from './OwnedPermissions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const progressStyle = {
  color: 'black',
};

const styles = {
  error: {
    color: 'red',
  },
};

class Permissions extends Component {
  componentDidMount () {
    this.props.getPermissions();
  }

  render () {
    const {
      permissions,
      revokePermission,
      addPermission,
      errorMessage,
      clearPermissionsError,
      isLoading,
      classes,
    } = this.props;

    return (
      <section>

        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            {errorMessage && <Typography
              className={classes.error}
            >
              {errorMessage}
            </Typography>}
            <AddPermission
              addPermission={addPermission}
              clearPermissionsError={clearPermissionsError}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OwnedPermissions
              permissions={permissions}
              revokePermission={revokePermission}
            />
          </Grid>
        </Grid>
        {isLoading && <div>
          <div className='progress-background' />
          <CircularProgress
            className='progress'
            style={progressStyle}
            thickness={7}
          />
        </div>}
      </section>
    );
  }
}

Permissions.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.object),
  getPermissions: PropTypes.func.isRequired,
  revokePermission: PropTypes.func.isRequired,
  addPermission: PropTypes.func.isRequired,
  clearPermissionsError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(Permissions);
