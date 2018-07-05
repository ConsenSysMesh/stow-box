import ecies from 'eth-ecies'
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
    console.log('here')
    let ipfs = store.getState().ipfs.ipfsInstance

    if (record.owner === "0x0000000000000000000000000000000000000000") {
      return(alert("Error: owner address is zero. does the file exist?"))
    }
    const ipfsRes = await ipfs.files.get(record.dataUri)
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