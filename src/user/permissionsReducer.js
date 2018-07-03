import { 
  SET_PERMISSIONS, 
  REMOVE_PERMISSION,
  ADD_PERMISSION
} from './ui/permissions/PermissionsActions'

const initialState = {
  asOwner: [],
  asViewer: []
}

const permissionsReducer = (state = initialState, action) => {
  if (action.type === SET_PERMISSIONS) {
    return Object.assign({}, state, action.payload)
  } else if (action.type === REMOVE_PERMISSION) {
    const index = state.asOwner.indexOf(action.payload)
    const asOwner = state.asOwner.slice()
    asOwner.splice(index, 1)
    return Object.assign({}, state, { asOwner })
  } else if (action.type === ADD_PERMISSION) {
    const asOwner = state.asOwner.slice()
    asOwner.push(action.payload)
    return Object.assign({}, state, { asOwner })
  }

  return state
}

export default permissionsReducer