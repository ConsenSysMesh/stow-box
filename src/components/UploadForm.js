import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  space: {
    display: 'block',
  },
  button: {
    marginTop: 20,
  },
};

class UploadForm extends Component {
  render () {
    const { public_key, metadata, onInputChange, handleSubmit, classes } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id='public_key'
            label='Public Key'
            required
            className={classes.space}
            value={public_key.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />

          <Typography variant='body1' className={classes.paragraph}>
            <b>Metadata</b> should be text that people will use to find your data. What will be useful to query later?
          </Typography>

          <TextField
            id='metadata'
            label='Metadata'
            required
            className={classes.space}
            value={metadata.replace(/\s/g, '')}
            onChange={onInputChange}
            margin='normal'
          />

          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            type='submit'
          >
            Upload to IPFS and Append to Linnia Protocol
          </Button>
        </form>
      </div>
    );
  }
}

UploadForm.propTypes = {
  public_key: PropTypes.string.isRequired,
  metadata: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadForm);
