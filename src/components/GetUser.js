import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import User from './User';
import GetUserForm from './GetUserForm';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  text: {
    marginTop: 20,
  },
};

class GetUser extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataHash: '',
      privateKey: '',
    };

    // Set variables pass as url arguments
    window.location.search.substr(1).split('&').forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      if (key === 'dataHash') {
        this.state['dataHash'] = val;
      }
    });
  }

  onInputChange = (property) => (event) => {
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onGetUserSubmit();
  };

  handleDecrypt = (event) => {
    event.preventDefault();
    const privateKey = event.target.elements.privateKey.value;
    this.props.onGetRecordDecrypt(this.props.record.data, privateKey);
  }

  render () {
    const { dataHash } = this.state;
    const { record } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Register a User
        </Typography>
        <GetUserForm
          dataHash={dataHash}
          onInputChange={this.onInputChange('dataHash')}
          handleSubmit={this.handleSubmit}
        />
        {record.data && <User record={record.data} />}
      </section>
    );
  }
}

export default withStyles(styles)(GetUser);
