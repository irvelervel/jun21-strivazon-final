import { useState } from 'react'
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { withRouter } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setUsernameActionWithThunk } from '../actions'

// mapStateToProps is a function returning an object
// const mapStateToProps = (state) => ({
//   cartLength: state.cart.products.length,
//   userName: state.user.userName
// })
// the one above is the best approach: return an object with the props you need already set

// const mapDispatchToProps = dispatch => ({
//   setUsername: (name) => {
//     dispatch(setUsernameActionWithThunk(name))
//     // with useDispatch() we can call this line (18) DIRECTLY from the component!
//   }
// })

// RULES OF HOOKS
// 1) use hooks just in react functional components
// 2) call them consistently, in the same order every time, avoid putting them into if conditions, other functions etc.

const CartIndicator = ({ history }) => {

  const [name, setName] = useState('')

  const cartLength = useSelector(state => state.cart.products.length)
  const userName = useSelector(state => state.user.userName)

  const dispatch = useDispatch()

  // const reduxStore = useSelector(state => state)
  // this is similar to mapStateToProps(state => state)

  return (
    <div className="ml-auto mt-2">
      {
        userName ? (
          <Button color="primary" onClick={() => history.push("/cart")}>
            <FaShoppingCart />
            <span className="ml-2">Welcome {userName}! {cartLength}</span>
          </Button>
        ) : (
          <FormControl // we need to make this a controlled input
            placeholder="Insert a username"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                console.log('sending the username...')
                dispatch(setUsernameActionWithThunk(name))
                // we're directly dispatching the action creator FROM the component!
                // we're NOT invoking our method which was wrapping the dispatching process
              }
            }}
          />
        )
      }
    </div>
  )
}

// with redux hooks we're DITCHING the connect function
// we're connecting this component in a new way
// using useSelector() and useDispatch()
// useSelector() is quite similar conceptually to mapStateToProps
// while useDispatch() will be useful for replacing a mapDispatchToProps

export default withRouter(CartIndicator);

// connect may take up to 2 parameters: mapStateToProps and mapDispatchToProps
// mapStateToProps is meant to deal with READING PURPOSES (it's the only mandatory one)
// mapDispatchToProps is meant to deal with DISPATCHING PURPOSES