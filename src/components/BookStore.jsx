import { useState, useEffect } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getBooksAction } from "../actions";
const BookStore = () => {

  const [bookSelected, setBookSelected] = useState(null)

  const dispatch = useDispatch()

  const books = useSelector(state => state.book.stock)
  const isError = useSelector(state => state.book.isError)
  const isLoading = useSelector(state => state.book.isLoading)

  useEffect(() => {
    // I'll need to invoke my action creator!
    dispatch(getBooksAction())
  }, [])


  const changeBook = (book) => setBookSelected(book);

  return isError ? (
    <Alert variant="danger">Error fetching books in stock</Alert>
  ) : isLoading ? (
    <Spinner variant="success" animation="border" />
  ) : (
    <Row>
      <Col md={4}>
        <BookList
          bookSelected={bookSelected}
          changeBook={changeBook}
          books={books}
        />
      </Col>
      <Col md={8}>
        <BookDetail
          bookSelected={bookSelected}
        />
      </Col>
    </Row>
  );
}

export default BookStore;
