import Permissions from './Permissions'
import { connect } from 'react-redux'
import { 
  getPermissions, 
  revokePermission, 
  addPermission,
  clearPermissionsError
} from './PermissionsActions'

const mapStateToProps = (state, ownProps) => {
	const permissions = state.permissions.asOwner
  const errorMessage = state.permissions.message
  const isLoading = state.permissions.isLoading
  
  return {
  	permissions,
    errorMessage,
    isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPermissions: () => {
      dispatch(getPermissions())
    },
    revokePermission: (permission) => {
      dispatch(revokePermission(permission))
    },
    addPermission: (dataHash, viewerAddress, viewerPublicKey, ownerPrivateKey) => {
      dispatch(addPermission(dataHash, viewerAddress, viewerPublicKey, ownerPrivateKey))
    },
    clearPermissionsError: () => {
      dispatch(clearPermissionsError())
    }
  }
}

const PermissionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Permissions)

export default PermissionsContainer
