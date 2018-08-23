import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  space: {
    marginRight: theme.spacing.unit * 5,
  },
});

class SearchForm extends Component {
  render() {
    const {
      handleSubmit,
      onInputChange,
      dataHash,
      owner,
      property,
      classes,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          id='dataHash'
          label='Record Data Hash'
          value={dataHash.replace(/\s/g, '')}
          onChange={onInputChange('dataHash')}
          className={classes.space}
          margin='normal'
        />
        <TextField
          id='owner'
          label='Owner Address'
          value={owner.replace(/\s/g, '')}
          onChange={onInputChange('owner')}
          className={classes.space}
          margin='normal'
        />
        <TextField
          id='property'
          label='MetaData'
          value={property.replace(/\s/g, '')}
          onChange={onInputChange('property')}
          className={classes.space}
          margin='normal'
        />
        <Button type='submit'>
          Search
        </Button>
      </form>
    );
  }
}

SearchForm.propType = {
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  dataHash: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchForm);

