// this file is holding two things usually:
// 1) the initial state of the application
// 2) the configureStore function execution

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'
import bookReducer from '../reducers/book'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 1)
export const initialState = {
  // a common practice is to not throw all the properties you need here randomly,
  // but instead to create slices, chunks, subobjects
  cart: {
    products: [],
  },
  user: {
    userName: '',
  },
  book: {
    stock: [],
    isError: false,
    isLoading: false,
  },
}

const persistConfig = {
  key: 'root',
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
      // the secret key will be used for encrypt/decrypt the stringified version of your redux
      // store saved in the engine of choice
      onError: (error) => {
        console.log(error)
      },
    }),
  ],
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})

const persistedReducer = persistReducer(persistConfig, bigReducer)

// 2)
const configureStore = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

// now we'll use the third argument of createStore to INJECT a MIDDLEWARE into the flow
// for applying a middleware we'll need to use a function from redux called applyMiddleware()

const persistor = persistStore(configureStore)

export { configureStore, persistor }

// FUTURE ENHANCERS CAPABILITIES:
// devTools enabling
// enabling redux-thunk
// enable persistency
// enable encryption

// the goal is the same we had on monday: implement the cart functionality
// this cart must be shared and accessible from at least 3 components:
// - Cart
// - CartIndicator
// - BookDetail
