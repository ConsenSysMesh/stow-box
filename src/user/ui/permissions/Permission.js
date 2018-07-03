import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Permission extends Component {
	render() {
		const { permission, revoke } = this.props

		return (
			<div>
        		<p>Record: {permission.dataHash}</p>
    			<p>Viewer: {permission.viewer}</p>
    			<button 
		        	className="pure-button pure-button-primary"
		        	onClick={() => revoke(permission)}
		        >Revoke</button>
	    	</div>
		)
	}
}

Permission.propTypes = {
	permission: PropTypes.object.isRequired,
	revoke: PropTypes.func.isRequired
}

export default Permission
