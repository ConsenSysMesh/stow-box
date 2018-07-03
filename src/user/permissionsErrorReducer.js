import { PERMISSION_ERROR } from './ui/permissions/PermissionsActions'

const initialState = {
  message: ''
}

const permissionsErrorReducer = (state = initialState, action) => {
  if (action.type === PERMISSION_ERROR) {
    const { message } = action
    return Object.assign({}, state, { message })
  }

  return state
}

export default permissionsErrorReducer

