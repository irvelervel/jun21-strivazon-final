import { SET_USERNAME } from '../actions'
import { initialState } from '../store'

// this is the object userReducer should mantain from now on!
// {
//     userName: ''
// }

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return {
        ...state,
        userName: action.payload,
      }
    }
    default:
      return state
  }
}

export default userReducer
