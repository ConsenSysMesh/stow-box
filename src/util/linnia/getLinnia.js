import store from '../../store'
import Linnia from 'linnia'

export const LINNIA_INITIALIZED = 'LINNIA_INITIALIZED'
function linniaInitialized(results) {
  return {
    type: LINNIA_INITIALIZED,
    payload: results
  }
}

let getLinnia = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    var results
    let web3 = store.getState().web3.web3Instance
    let ipfs = store.getState().ipfs.ipfsInstance
    const linnia = new Linnia(web3, ipfs, {
      hubAddress: process.env.LINNIA_HUB_ADDRESS
    });


    results = {
      linniaInstance: linnia
    }

    resolve(store.dispatch(linniaInitialized(results)))
  })
})

export default getLinnia
