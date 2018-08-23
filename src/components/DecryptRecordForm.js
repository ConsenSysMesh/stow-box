import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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

class DecryptRecordForm extends Component {
  render() {
    const { handleDecrypt, privateKey, onInputChange, classes } = this.props;

    return (
      <div>
        <Typography variant='body1' className={classes.text}>
          Now we can decrypt the plain text content of the record by putting in our encryption
          private key.
        </Typography>
        <form onSubmit={handleDecrypt}>
          <TextField
            id='privateKey'
            label='Encryption Private Key'
            required
            value={privateKey.replace(/\s/g, '')}
            onChange={onInputChange}
            className={classes.space}
            margin='normal'
          />
          <Button type='submit'>
            Decrypt Data
          </Button>
        </form>
      </div>
    );
  }
}

DecryptRecordForm.propTypes = {
  privateKey: PropTypes.string.isRequired,
  handleDecrypt: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DecryptRecordForm);
