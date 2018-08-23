import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Logo from 'linnia-brand/components/Logo';

const height = 35;
const width = 35;

const styles = (theme) => ({
  tab: {
    minWidth: 'unset',
  },
  tabLabelContainer: {
    padding: 10,
  },
  menuIcon: {
    height: '35px',
    width: '35px',
  },
  tabs: {
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    },
  },
});

class Header extends Component {
  navigateTo = route => () => {
    this.props.history.push(route);
  };

  render () {
    const { classes } = this.props;

    return (
      <AppBar position='sticky' color='primary'>
        <Toolbar className={classes.tabs}>
          <Tab
            label={<Logo style={{ height, width }} />}
            onClick={this.navigateTo('/')}
            classes={{
              root: `${classes.tab}`,
              labelContainer: classes.tabLabelContainer,
            }}
          />
          <Tab
            label='Records'
            onClick={this.navigateTo('/get_record')}
            classes={{
              root: `${classes.tab}`,
              labelContainer: classes.tabLabelContainer,
            }}
          />
          <Tab
            label='Permissions'
            onClick={this.navigateTo('/permissions')}
            classes={{
              root: `${classes.tab}`,
              labelContainer: classes.tabLabelContainer,
            }}
          />
          <Tab
            label='Search'
            onClick={this.navigateTo('/search')}
            classes={{
              root: `${classes.tab}`,
              labelContainer: classes.tabLabelContainer,
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
