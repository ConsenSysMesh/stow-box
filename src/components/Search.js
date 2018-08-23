import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Record from './Record';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  error: {
    color: 'red',
  },
  text: {
    marginTop: 20,
  },
};

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataHash: '',
      owner: '',
      property: '',
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
    const value = event.target.value;
    this.setState({ [property]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const dataHash = event.target.elements.dataHash.value;
    const owner = event.target.elements.owner.value;
    const property = event.target.elements.property.value;
    this.props.onSearchSubmit(dataHash, owner, property);
  }

  render () {
    const { dataHash, property, owner } = this.state;
    const { search, classes } = this.props;
    const { results, message } = search;

    return (
      <section>
        <Typography variant='title'>
          Search for records
        </Typography>
        <Typography variant='body1' className={classes.text}>
          You can search for records using a combination of any of the below record
          properties.
        </Typography>
        {message && <Typography
          variant='body1'
          className={classes.error}
        >
          {message}
        </Typography>}
        <SearchForm
          dataHash={dataHash}
          property={property}
          owner={owner}
          handleSubmit={this.handleSubmit}
          onInputChange={this.onInputChange}
        />
        {results.map((record, i) => (
          <Record
            record={record}
            key={i}
          />
        ))}
      </section>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
