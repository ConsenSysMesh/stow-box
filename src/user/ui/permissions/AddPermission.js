import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddPermission extends Component {
	state = {
		dataHash: '',
		viewerAddress: '',
		ownerPrivateKey: '',
		viewerPublicKey: ''
	}

	onInputChange = (property) => (event) => {
		this.props.clearPermissionsError()
		const value = event.target.value
		this.setState({ [property]: value })
	}

	handleSubmit = (event) => {
		event.preventDefault()

		this.props.addPermission(
			this.state.dataHash,
			this.state.viewerAddress,
			this.state.ownerPrivateKey,
			this.state.viewerPublicKey
		)
	}

	render() {
		return (
			<div className="permissions-form inline-block">
				<h2>Add Permission</h2>
				<form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
					{Object.keys(this.state).map((property, i) => {
						return (<label key={i}>{property}
							<input 
								name={property}
								value={this.state[property]}
								onChange={this.onInputChange(property)}
							/>
						</label>)
					})}
					<br />
					<button className="pure-button pure-button-primary" type="submit">Add Permission</button>
				</form>
			</div>
		)
	}
}

AddPermission.propTypes = {
	addPermission: PropTypes.func.isRequired,
	clearPermissionsError: PropTypes.func.isRequired
}

export default AddPermission