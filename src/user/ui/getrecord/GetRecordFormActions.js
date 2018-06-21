import IPFS from 'ipfs-api'
import Linnia from 'linnia'
import Web3 from 'web3'
const bs58 = require('bs58')
const eutil = require('ethereumjs-util')
const multihashes = require('multihashes')
const ecies = require('eth-ecies')

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
    record.ipfsHash = bs58.encode(multihashes.encode(eutil.toBuffer(record.dataUri), 18, 32))

    dispatch(assignRecord(record))

  }
}

export function getDecryptedRecord(record, privateKey) {

  // Get Record from Linnia
  return async function(dispatch) {
    const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

    if (record.owner == "0x0000000000000000000000000000000000000000") {
      console.error("Error: owner address is zero. does the file exist?")
      return
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
    }

  }
}