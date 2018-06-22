const bs58 = require('bs58')
const eutil = require('ethereumjs-util')
const multihashes = require('multihashes')
const ecies = require('eth-ecies')
import store from '../../../store'

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
    let linnia = store.getState().linnia.linniaInstance

    // Double-check web3's status.
    if (typeof store.getState().web3.web3Instance !== 'undefined') {
      let record = await linnia.getRecord(dataHash)
      record.dataHash = dataHash
      record.ipfsHash = bs58.encode(multihashes.encode(eutil.toBuffer(record.dataUri), 18, 32))
  
      dispatch(assignRecord(record))
    }
    else{
      console.log("No Web3")
    }

  }
}

export function getDecryptedRecord(record, privateKey) {

  // Get Record from Linnia
  return async function(dispatch) {
    let ipfs = store.getState().ipfs.ipfsInstance

    if (record.owner === "0x0000000000000000000000000000000000000000") {
      return(alert("Error: owner address is zero. does the file exist?"))
    }
    const ipfsRes = await ipfs.files.get(record.ipfsHash)
    const encrypted = ipfsRes[0].content

    // Try to decrypt with the provided key
    try{
      const decrypted = ecies.decrypt(privateKey, encrypted)
      record.decrypted = decrypted.toString()
      dispatch(assignRecord(record))
    } catch(e){
      console.log(e)
      return(alert("Error decrypting data. Probably wrong private key"))
    }

  }
}