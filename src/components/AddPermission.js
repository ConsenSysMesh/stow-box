import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  important: {
    fontFamily: 'Heavitas',
    display: 'inline',
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
};

class AddPermission extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataHash: '',
      viewerEthereumAddress: '',
      viewerEncyptionPublicKey: '',
      ownerEncryptionPrivateKey: '',
    };

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      if (this.state[key] !== undefined) {
        this.state[key] = val;
      }
    });
  }

  onInputChange = (property) => (event) => {
    this.props.clearPermissionsError();
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addPermission(
      this.state.dataHash,
      this.state.viewerEthereumAddress,
      this.state.viewerEncyptionPublicKey,
      this.state.ownerEncryptionPrivateKey
    );
  }

  render () {
    const {
      dataHash,
      viewerEthereumAddress,
      viewerEncyptionPublicKey,
      ownerEncryptionPrivateKey,
    } = this.state;

    const { classes } = this.props;

    return (
      <div>
        <Typography variant='title' className={classes.title}>
          Add Permission
        </Typography>
        <Typography variant='body1'>
          In order to share a file using the Linnia Protocol you have to give permission
          to access the file to the viewer.
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='body1'>
            To start, we need the <span className={classes.important}>Data Hash</span> of
            the file you are sharing.
          </Typography>
          <TextField
            name='dataHash'
            required
            fullWidth
            className={classes.text}
            label='Data Hash'
            value={dataHash}
            onChange={this.onInputChange('dataHash')}
          />
          <Typography variant='body1'>
            Next, we need the <span className={classes.important}>Ethereum Address</span> of
            the user you want to share the record with.
          </Typography>
          <TextField
            name='viewerEthereumAddress'
            required
            fullWidth
            className={classes.text}
            label='Viewer Ethereum Address'
            value={viewerEthereumAddress}
            onChange={this.onInputChange('viewerEthereumAddress')}
          />
          <Typography variant='body1'>
            We also need the viewer's <span className={classes.important}>Encryption Public Key</span>
            so we can encrypt their copy of our record.
          </Typography>
          <TextField
            name='viewerEncyptionPublicKey'
            required
            fullWidth
            className={classes.text}
            label='Viewer Encryption Public Key'
            value={viewerEncyptionPublicKey}
            onChange={this.onInputChange('viewerEncyptionPublicKey')}
          />
          <Typography variant='body1'>
            Finally, we need your <span className={classes.important}>Private Encryption Key</span>
            so that we can decrypt the original copy of the data. Don't worry, we won't save it!
          </Typography>
          <TextField
            name='ownerEncryptionPrivateKey'
            required
            fullWidth
            className={classes.text}
            label='Your Encryption Private Key'
            value={ownerEncryptionPrivateKey}
            type='password'
            onChange={this.onInputChange('ownerEncryptionPrivateKey')}
          />
          <Button type='submit'>
            Add Permission
          </Button>
        </form>
      </div>
    );
  }
}

AddPermission.propTypes = {
  addPermission: PropTypes.func.isRequired,
  clearPermissionsError: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddPermission);
