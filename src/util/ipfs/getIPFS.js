import store from '../../store'
import IPFS from 'ipfs-api'

export const IPFS_INITIALIZED = 'IPFS_INITIALIZED'
function ipfsInitialized(results) {
  return {
    type: IPFS_INITIALIZED,
    payload: results
  }
}

let getIPFS = new Promise(function(resolve, reject) {
  window.addEventListener('load', function(dispatch) {
    var results
    const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

    results = {
      ipfsInstance: ipfs
    }

    resolve(store.dispatch(ipfsInitialized(results)))
  })
})

export default getIPFS
