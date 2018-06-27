var request = require('request')

export const MAKE_SEARCH = 'MAKE_SEARCH'
function assignSearch(search) {
  return {
    type: MAKE_SEARCH,
    payload: search
  }
}

export function search(dataHash, owner, property) {

  // Get Record from Linnia
  return async function(dispatch) {
    var req = process.env.LINNIA_SEARCH_URI + '/records'
    if(dataHash){
      req = req + '/'+dataHash
    }
    else if(owner) {
      if(property){
        req = req + '?owner='+owner+'&property='+property
      }else{
        req = req + '?owner='+owner
      }
    }
    else if(property){
      req = req + '?property='+property
    } 

    request(req, function (error, response, body) {
      dispatch(assignSearch(body))
    });
  }
}