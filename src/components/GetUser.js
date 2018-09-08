import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import User from './User';
import RegisteredUser from './RegisteredUser';
import GetUserForm from './GetUserForm';
import RegisterUserForm from './RegisterUserForm';
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

  generateUser = (event) => {
    event.preventDefault();
    this.props.onGetUserSubmit();
  };

  registerUser = (event) => {
    event.preventDefault();
    this.props.onGetRegisterUser();
  };

  render () {
    const { user } = this.props;

    return (
      <section>
        <Typography variant='title'>
          Register a User
        </Typography>

        <GetUserForm
          handleSubmit={this.generateUser}
        />
        {user.data && <User user={user.data} />}

        {user.data && <RegisterUserForm
          handleSubmit={this.registerUser}
        />}
        {user.registration && <RegisteredUser user={user.registration} />}
      </section>
    );
  }
}

export default withStyles(styles)(GetUser);
