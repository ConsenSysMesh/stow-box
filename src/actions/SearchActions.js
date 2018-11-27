import config from '../config';
import request from 'request';

export const MAKE_SEARCH = 'MAKE_SEARCH';

const assignSearch = (search) => ({
  type: MAKE_SEARCH,
  payload: search,
});

export const search = (dataHash, owner, property) => async (dispatch) => {
  /*
    This action builds a URI based on the arguments provided, then queries
    the Stow server to find records that match. This is a normal AJAX request.
    Property is a string that is compared to the metadata of records.
  */

  let req = config.STOW_SEARCH_URI + "/records";

  if (dataHash) {
    req = req + '/' + dataHash;
  } else if (owner) {
    if (property) {
      req = req + '/?owner=' + owner + '&property=' + property;
    } else {
      req = req + '/?owner=' + owner;
    }
  } else if (property) {
    req = req + '/?property=' + property;
  }

  request(req, (error, response, body) => {
    if (error) {
      console.error(error.stack);
    }

    let parsedBody = JSON.parse(body);

    parsedBody = Array.isArray(parsedBody) ? parsedBody : [parsedBody];

    dispatch(assignSearch(parsedBody));
  });
};
