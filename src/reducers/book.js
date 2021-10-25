// import { SET_USERNAME } from '../actions'
import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from '../actions'
import { initialState } from '../store'

// this is the object bookReducer should mantain from now on!
// {
//     stock: []
// }

const bookReducer = (state = initialState.book, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload,
      }
    case GET_BOOKS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case GET_BOOKS_ERROR:
      return {
        ...state,
        isError: action.payload,
      }
    default:
      return state
  }
}

export default bookReducer
