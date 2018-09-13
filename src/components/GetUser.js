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
