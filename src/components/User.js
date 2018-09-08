import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  layout: {
    marginTop: 30,
  },
  highlightBox: {
    backgroundColor: '#61bac6',
    padding: 10,
    wordWrap: 'break-word',
  },
};

class User extends Component {
  render() {
    const { user, classes } = this.props;

    return (
      <div className={classes.layout}>
        <Typography variant='title'>
          Success!
        </Typography>
        <div className={classes.highlightBox}>
          <Typography variant='body1'>
            <b>Private Key:</b> {user.privateKey}
          </Typography>
          <Typography variant='body1'>
            <b>Public Key:</b> {user.publicKey}
          </Typography>
        </div>
        <Typography variant='body1'>
            It is your responsibility to store them safely. If you loose your keys or they get stolen, there is nothing we can do in order to recover them. Save them carefully!
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(User);
