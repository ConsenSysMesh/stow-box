import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { tryLoginUser } from './LoginFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginFormSubmit: (address) => {
      dispatch(tryLoginUser(address))
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
