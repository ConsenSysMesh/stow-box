import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
      marginTop: 20,
  },
});

class GetUserForm extends Component {
  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <div>
        <Typography variant='body1' className={classes.text}>
            First, we need to generate a pair of encryption keys. You will use these keys to encrypt and decrypt files on behalf of your user. To understand more about Private and Public Encryption Keys please: <a href='https://github.com/ConsenSys/linnia-resources/' target='_blank' rel='noopener noreferrer'>Go Here</a>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button
            type='submit'
            className={classes.button}
          >
            Generate Linnia Encryption Keys
          </Button>
        </form>
      </div>
    );
  }
}

GetUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(GetUserForm);
