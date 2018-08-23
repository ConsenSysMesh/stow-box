import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  text: {
    maxWidth: '50%',
    marginTop: theme.spacing.unit * 3,
  },
});

class Home extends Component {
  render () {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant='display2' className={classes.text}>
          Welcome to Linnia!
        </Typography>
        <Typography variant='body1' className={classes.text}>
          Time to start building the decentralized future.
        </Typography>
        <Typography variant='title' className={classes.text}>
          Linnia as a decentralized backend
        </Typography>
        <Typography variant='body1' className={classes.text}>
          Linnia is a decentralized data storage and sharing protocol. With Linnia, you can quickly build
          apps that give user's agency over their own data.
        </Typography>
        <Typography variant='title' className={classes.text}>
          Metamask Authentication
        </Typography>
        <Typography variant='body1' className={classes.text}>
          This particular box comes with autentication via Metamask. You need it to use this app.
          You can learn more about it and download it <a href='https://metamask.io/'>here</a>.
        </Typography>
        <Typography variant='title' className={classes.text}>
          Styled with Material-UI
        </Typography>
        <Typography variant='body1' className={classes.text}>
          The Linnia team highly recommends building out applications using the MaterialUI CSS
          framework. This starter kit incorporates the React version. You can read more about it
          and see the docs <a href='https://material-ui.com/'>here</a>.You can quickly re-style
          the application by replacing the theme in the starter kits index with your own!
        </Typography>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
