import { connect } from 'react-redux';
import Search from '../components/Search';
import { search } from '../actions/SearchActions';

const mapStateToProps = (state, ownProps) => {
  return { search: state.search };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchSubmit: (dataHash, owner, property) => {
      dispatch(search(dataHash, owner, property));
    },
  };
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
