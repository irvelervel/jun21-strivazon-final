// here's the place for our ACTION CREATORS
// functions that return actions

// redux-thunk is now injected into the redux flow
// it will allow the redux store to deal with mainly async operations
// redux-thunk will ENRICH your ACTION CREATORS
// traditionally, action creators are just functions meant to return actions
// redux-thunk will now make our action creators capable of not just returning ACTIONS (js objs),
// but return FUNCTIONS
// so, with redux-thunk we get the ability to DISPATCH FUNCTIONS

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'

export const addToCartAction = (book) => ({
  type: ADD_ITEM_TO_CART,
  // an action is a JS object with AT LEAST a type property
  payload: book,
  // the PAYLOAD is the property carrying over any additional piece of info
  // needed by the reducer to compute the new state
  // payload is all the additional info needed from the reducers to calculate
  // the new state of the application
})

export const removeItemFromCartAction = (index) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: index,
})

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
})

export const setUsernameActionWithThunk = (name) => {
  return (dispatch, getState) => {
    // here we can do anything!
    // we can fetch data, or ...
    console.log('This username has been dispatched with a function!', getState())
    dispatch({
      type: SET_USERNAME,
      payload: name,
    })
  }
}

// thanks to redux-thunk we can leverage much more powerful action creators,
// that do not just return an action, but can return a FUNCTION
// this function can be async, can be very complex...
// but at the end of it we can still do the right thing and dispatch the appropriate action

export const getBooksAction = () => {
  return async (dispatch, getState) => {
    console.log('...fetching the books')
    dispatch({
      type: GET_BOOKS_LOADING,
      payload: true,
    })
    try {
      let resp = await fetch('https://striveschool-api.herokuapp.com/food-books')
      if (resp.ok) {
        let books = await resp.json()
        // I will need now to dispatch the action with the books I finished fetching!
        dispatch({
          type: GET_BOOKS,
          payload: books,
        })
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: false,
        })
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
      } else {
        console.log('error')
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: true,
        })
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_BOOKS_ERROR,
        payload: true,
      })
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: false,
      })
    }
  }
}
