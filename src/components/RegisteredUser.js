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

class RegisteredUser extends Component {
  render() {
    const { record, classes } = this.props;

    return (
      <div className={classes.layout}>
        <Typography variant='body1' className={classes.text}>
          Your account has been successfully registered with the Linnia User Contract at address: {record.address}
        </Typography>
        <Typography variant='body1' className={classes.text}>
          Check out out your transaction record on <a href='https://ropsten.etherscan.io/address/{record.address}' target='_blank' rel='noopener noreferrer'>Etherscan</a>.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(RegisteredUser);
