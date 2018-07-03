import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddPermission from './AddPermission'
import OwnedPermissions from './OwnedPermissions'

class Permissions extends Component {
	componentDidMount() {
		this.props.getPermissions()
	}

	render() {
		const { 
			permissions, 
			revokePermission, 
			addPermission, 
			errorMessage, 
			clearPermissionsError 
		} = this.props

		const { asOwner } = permissions

		return (
			<div>
				{errorMessage && <h2 className="error">{errorMessage}</h2>}
				<AddPermission 
					addPermission={addPermission}
					clearPermissionsError={clearPermissionsError}
				/>
				<OwnedPermissions 
					permissions={asOwner}
					revokePermission={revokePermission}
				/>
			</div>
		)
	}
}

Permissions.propTypes = {
	permissions: PropTypes.object,
	getPermissions: PropTypes.func.isRequired,
	revokePermission: PropTypes.func.isRequired,
	addPermission: PropTypes.func.isRequired,
	clearPermissionsError: PropTypes.func.isRequired,
	errorMessage: PropTypes.string
};

export default Permissions