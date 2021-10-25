import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCartAction } from "../actions";
import { useEffect } from "react";

const Cart = ({ history }) => {

  const cart = useSelector(state => state.cart.products)
  const userName = useSelector(state => state.user.userName)

  const dispatch = useDispatch()

  useEffect(() => {
    // let's check if the user is logged in!
    if (!userName) {
      // go back home!
      // let's use history
      // do I have history here?
      // yes, this is a routed component (look at App.jsx)
      history.replace('/')
    }
  }, [])

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: "none" }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button variant="danger" onClick={() => dispatch(removeItemFromCartAction(i))}>
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{" "}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart
