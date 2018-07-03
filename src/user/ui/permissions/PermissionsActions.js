import store from '../../../store'
import axios from 'axios'
import ecies from 'eth-ecies'

export const SET_PERMISSIONS = 'SET_PERMISSIONS'
export const REMOVE_PERMISSION = 'REMOVE_PERMISSION'
export const ADD_PERMISSION = 'ADD_PERMISSION'
export const PERMISSION_ERROR = 'PERMISSION_ERROR'

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
	payload: permission
})

const showPermissionError = (message) => ({
	type: PERMISSION_ERROR,
	message
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
	const linnia = store.getState().linnia.linniaInstance
	const ownerAddress = store.getState().web3.web3Instance.eth.accounts[0]
	const dataHash = permission.dataHash
	const viewer = permission.viewer
	const { permissions } = await linnia.getContractInstances()
	await permissions.revokeAccess(dataHash, viewer, {
		from: ownerAddress,
		gas: 400000
	})
	dispatch(removePermission(permission))
}

export const addPermission = (dataHash, viewer, ownerPrivateKey, viewerPublicKey) => async (dispatch) => {
	let file, decryptedData, reencrypted, viewerFile

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
		    gas: 500000
		})
	} catch (e) {
		dispatch(showPermissionError('Unable to create permission. Does this permission already exist?'))
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