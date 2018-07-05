import store from '../../../store'
import axios from 'axios'
import ecies from 'eth-ecies'

export const SET_PERMISSIONS = 'SET_PERMISSIONS'
export const REMOVE_PERMISSION = 'REMOVE_PERMISSION'
export const ADD_PERMISSION = 'ADD_PERMISSION'
export const PERMISSION_ERROR = 'PERMISSION_ERROR'
export const UPLOADING_PERMISSION ='UPLOADING_PERMISSION'

const assignPermissions = (permissions) => ({
  type: SET_PERMISSIONS,
  payload: permissions
})

const removePermission = (permission) => ({
  type: REMOVE_PERMISSION,
  payload: permission
})

const appendPermission = (permission) => ({
  type: ADD_PERMISSION,
  payload: permission,
  isLoading: false
})

const showPermissionError = (message) => ({
  type: PERMISSION_ERROR,
  isLoading: false,
  message
})

const uploadingPermission = () => ({
  type: UPLOADING_PERMISSION,
  isLoading: true
})

export const clearPermissionsError = () => async (dispatch) => {
  dispatch(showPermissionError(''))
}

export const getPermissions = () => async (dispatch) => {
  const ownerAddress = store.getState().web3.web3Instance.eth.accounts[0]
  const host = process.env.LINNIA_SEARCH_URI
  const url = `${host}/users/${ownerAddress}/permissions`
  const response = await axios.get(url)
  dispatch(assignPermissions(response.data))
}

export const revokePermission = (permission) => async (dispatch) => {
  dispatch(uploadingPermission())

  const linnia = store.getState().linnia.linniaInstance
  const ownerAddress = store.getState().web3.web3Instance.eth.accounts[0]
  const dataHash = permission.dataHash
  const viewer = permission.viewer
  const { permissions } = await linnia.getContractInstances()

  try {
    await permissions.revokeAccess(dataHash, viewer, {
      from: ownerAddress,
      gas: 500000,
      gasPrice: 20000000000
    })
  } catch (e) {
    console.error(e)
    dispatch(showPermissionError('Transaction to ethereum network failed! Please check your console for errors.'))
    return
  }

  dispatch(removePermission(permission))
}

export const addPermission = (dataHash, viewer, ownerPrivateKey, viewerPublicKey) => async (dispatch) => {
  let file, decryptedData, reencrypted, viewerFile

  dispatch(uploadingPermission())

  const linnia = store.getState().linnia.linniaInstance
  const ipfs = linnia.ipfs

  const record = await linnia.getRecord(dataHash)

  if (!record.dataHash) {
    dispatch(showPermissionError('Unable to retreive record. Does a record with that dataHash exist?'))
    return 
  }

  try {
    file = await ipfs.files.get(record.dataUri)
  } catch (e) {
    dispatch(showPermissionError('Unable to pull file from storage. Does record have valid dataUri?'))
    return
  }

  try {
    const encryptedData = file[0].content
    decryptedData = ecies.decrypt(ownerPrivateKey, encryptedData)
  } catch (e) {
    dispatch(showPermissionError('Unable to decrypt file. Is the owner private key correct?'))
    return
  }

  try {
    reencrypted = ecies.encrypt(new Buffer(viewerPublicKey,  'hex'), decryptedData)
  } catch (e) {
    dispatch(showPermissionError('Unable to encrypt file for viewer. Is the viewer public key correct?'))
    return    
  }

  try {
    viewerFile = await ipfs.files.add(reencrypted)
  } catch (e) {
    dispatch(showPermissionError('Unable to reupload viewer file. Please try again later.'))
    return
  }

  const dataUri = viewerFile[0].hash
  const owner = store.getState().web3.web3Instance.eth.accounts[0]

  try {
    const { permissions } = await linnia.getContractInstances()
    await permissions.grantAccess(dataHash, viewer, dataUri, {
        from: owner,
        gas: 500000,
        gasPrice: 20000000000
    })
  } catch (e) {
    console.error(e)
    dispatch(showPermissionError('Transaction to ethereum network failed! Please check your console for errors.'))
    return    
  }

  const permission = {
    viewer,
    owner,
    dataUri,
    dataHash,
    canAccess: true,
  };

  dispatch(appendPermission(permission))
}