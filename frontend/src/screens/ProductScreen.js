import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, ListGroup, Card, Button, Carousel, Form } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { baseUrl } from '../urls'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <Container>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ?
                <CircularProgress /> :
                error ? <Message varint='danger'>error</Message>
                    :
                    (
                        <Row>
                            <Col md={6}>
                                <Carousel pause='hover' className='bg-light' style={{ paddingTop: '0%' }} >
                                    {product.images &&
                                        product.images.map((x, k) => (
                                            <Carousel.Item key={k}>
                                                <div style={{ height: 400 }}>
                                                    <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '1%', margin: '0%' }}
                                                        src={`${baseUrl}/api${x}`}
                                                        alt={product.name} fluid />
                                                </div>
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        ProductDetails
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ₹{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup varinat='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong>₹ {product.price} </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    GST:
                                                </Col>
                                                <Col>
                                                    <strong>{product.gst} % </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Final Price:
                                                </Col>
                                                <Col>
                                                    <strong>₹ {product.finalPrice} </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                    </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.returnable
                                                ? <Message>Returnable</Message>
                                                : <Message>Not Returnable</Message>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.refundable
                                                ? <Message>Refundable</Message>
                                                : <Message>Not Refundable</Message>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.exchange === 0
                                                ? <Message>No Exchange</Message>
                                                : <Message>Exchange with in {product.exchange} days</Message>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                    )
            }
        </Container>
    )
}

export default ProductScreen