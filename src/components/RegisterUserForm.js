import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
  text: {
    marginTop: 20,
  },
});

class RegisterUserForm extends Component {
  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <div>
        <Typography variant='body1' className={classes.text}>
          Next up, we need to register your ethereum address with the Linnia Protocol smart contracts.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button type='submit'>
            Register Linnia User
          </Button>
        </form>
      </div>
    );
  }
}

RegisterUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(RegisterUserForm);
