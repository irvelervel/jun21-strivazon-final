import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../actions'
import { initialState } from '../store'

// this cartReducer now just has to mantain the cart key of the redux store
// that's what its receiving from redux in the arguments, and that's what it should
// mantain from now on

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      // this.state.cart.products.push() <-- THIS IS SUPER WRONG
      // BECAUSE PUSH MODIFIES THE ARRAY IN-PLACE
      // YOU DON'T WANT EVER TO MUTATE YOUR ARGUMENTS

      // {
      //   // other things,
      //   cart: {
      //     // other things,
      //     products: ['ciao']
      //   }
      // }

      return {
        // the new state must have the same shape as the one we currently have
        // we also have to make super sure that we're not mutating our arguments,
        // because we're in a pure function
        ...state,
        // products: [...state.cart.products, action.payload],
        products: state.products.concat(action.payload),
        // both of these strategies do the same result! choose you favourite :)
      }
    }
    case REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        products: state.products.filter((book, i) => i !== action.payload),
        // products: [...state.cart.products.slice(0, action.payload), ...state.cart.products.slice(action.payload + 1)]
        // both of these strategies do the same result! choose you favourite :)
      }
    }
    default:
      return state
  }
}

export default cartReducer

// 1
// 2
// 3
// 4 <- I want to remove this one
// 5

// 1
// 2
// 3
// 5
