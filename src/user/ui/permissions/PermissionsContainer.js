import Permissions from './Permissions'
import { connect } from 'react-redux'
import { 
  getPermissions, 
  revokePermission, 
  addPermission,
  clearPermissionsError
} from './PermissionsActions'

const mapStateToProps = (state, ownProps) => {
	const permissions = state.permissions
  const errorMessage = state.permissionsError.message

  return {
  	permissions,
    errorMessage
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
    addPermission: (dataHash, viewerAddress, ownerPrivateKey, viewerPublicKey) => {
      dispatch(addPermission(dataHash, viewerAddress, ownerPrivateKey, viewerPublicKey))
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
