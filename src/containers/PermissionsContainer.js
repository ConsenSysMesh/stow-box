import Permissions from '../components/Permissions';
import {connect} from 'react-redux';
import {
  getPermissions,
  revokePermission,
  addPermission,
  clearPermissionsError,
} from '../actions/PermissionsActions';

const mapStateToProps = (state, ownProps) => {
  const permissions = state.permissions.asOwner;
  const errorMessage = state.permissions.message;
  const isLoading = state.permissions.isLoading;

  return {
    permissions,
    errorMessage,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPermissions: () => {
      dispatch(getPermissions());
    },
    revokePermission: (permission) => {
      dispatch(revokePermission(permission));
    },
    addPermission: (dataHash, viewerEthereumAddress, viewerEncyptionPublicKey, ownerEncryptionPrivateKey) => {
      dispatch(addPermission(dataHash, viewerEthereumAddress, viewerEncyptionPublicKey, ownerEncryptionPrivateKey));
    },
    clearPermissionsError: () => {
      dispatch(clearPermissionsError());
    },
  };
};

const PermissionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Permissions);

export default PermissionsContainer;
