import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paragraph: {
    marginTop: 50,
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
    const { file, public_key, metadata, onInputChange, handleSubmit, classes } = this.props;

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
            fullWidth
          />

          <Typography variant='body1' className={classes.paragraph}>
            <b>JSON file data</b> to upload. Here is some dummy data you can user, edit or replace.
          </Typography>

          <TextField
            id='file'
            label='file'
            required
            className={classes.space}
            value={file}
            onChange={onInputChange}
            margin='normal'
            multiline='true'
            rows='25'
            fullWidth
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
            fullWidth
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
  file: PropTypes.string.isRequired,
  public_key: PropTypes.string.isRequired,
  metadata: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadForm);
