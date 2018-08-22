import { connect } from 'react-redux';
import SearchForm from '../components/SearchForm';
import { search } from '../actions/SearchFormActions';

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

const SearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);

export default SearchFormContainer;
