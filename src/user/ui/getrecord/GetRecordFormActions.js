import ecies from 'eth-ecies'
import store from '../../../store'

export const GET_RECORD = 'GET_RECORD'
function assignRecord (record) {
  return {
    type: GET_RECORD,
    payload: record,
  }
}

export function getRecord (dataHash) {
  // Get Record from Linnia
  return async (dispatch) => {
    const { linnia } = store.getState().auth
    const record = await linnia.getRecord(dataHash)
    dispatch(assignRecord(record))
  }
}

export function getDecryptedRecord (record, privateKey) {
  // Get Record from Linnia
  return async (dispatch) => {
    const { ipfs } = store.getState().auth

    if (record.owner === '0x0000000000000000000000000000000000000000') {
      return (alert('Error: owner address is zero. does the file exist?'))
    }

    const ipfsRes = await ipfs.files.get(record.dataUri)
    const encrypted = ipfsRes[0].content

    // Try to decrypt with the provided key
    try {
      const decrypted = ecies.decrypt(privateKey, encrypted)
      record.decrypted = decrypted.toString()
      dispatch(assignRecord(record))
    } catch (e) {
      console.log(e)
      return (alert('Error decrypting data. Probably wrong private key'))
    }
  }
}
