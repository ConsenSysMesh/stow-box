import { browserHistory } from 'react-router'
import IPFS from 'ipfs-api'
import Linnia from 'linnia'
import Web3 from 'web3'

export const GET_RECORD = 'GET_RECORD'
function assignRecord(record) {
  return {
    type: GET_RECORD,
    payload: record
  }
}

export function getRecord(dataHash) {

  // Get Record from Linnia
  return async function(dispatch) {
    const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
    const linnia = new Linnia(web3, ipfs, {
      hubAddress: '0x8cdaf0cd259887258bc13a92c0a6da92698644c0'
    });
    let record = await linnia.getRecord(dataHash)
    record.dataHash = dataHash

    dispatch(assignRecord(record))

  }
}