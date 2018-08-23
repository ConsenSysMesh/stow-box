import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  text: {
    wordWrap: 'break-word',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
  },
};

class Permission extends Component {
  render () {
    const { permission, revoke, classes } = this.props;

    return (
      <div>
        <Typography
          variant='title'
          className={classes.title}
        >
          Data Hash
        </Typography>
        <Typography
          variant='body1'
          className={classes.text}
        >
          {permission.dataHash}
        </Typography>
        <Typography
          variant='title'
          className={classes.title}
        >
          Viewer
        </Typography>
        <Typography
          variant='body1'
          className={classes.text}
        >
          Viewer: {permission.viewer}
        </Typography>
        <Button
          onClick={() => revoke(permission)}
          className={classes.button}
        >
          Revoke
        </Button>
      </div>
    );
  }
}

Permission.propTypes = {
  permission: PropTypes.object.isRequired,
  revoke: PropTypes.func.isRequired,
};

export default withStyles(styles)(Permission);
