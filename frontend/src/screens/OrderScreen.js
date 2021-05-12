import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {
    getOrderDetails,
    payOrder,
    dispatchOrder,
    deliverOrder,
} from '../actions/orderActions'
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import { baseUrl } from '../urls'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId, successPay, successDeliver, order])

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }

    const dispatchHandler = () => {
        dispatch(dispatchOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        <Container>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>{' '}
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {' '}{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                    </p>
                                    <p>
                                        <strong>Phone :</strong>
                                        {' '}{order.shippingAddress.phone}
                                    </p>
                                    {order.isDispatched ? (
                                        <Message variant='success'>
                                            Dispatched on {order.dispatchedAt}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Dispatched</Message>
                                    )}
                                    {order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={`${baseUrl}/api${item.images[0]}`}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>₹{order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>₹{order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>₹{order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>₹{order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Message> Your Order is Placed Successfully! You will get your Product very soon. </Message>
                                    </ListGroup.Item>
                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        //order.isPaid &&
                                        !order.isDispatched && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={dispatchHandler}>
                                                    Mark As Dispatched
                                                        </Button>
                                            </ListGroup.Item>
                                        )}
                                    {loadingDeliver && <CircularProgress />}
                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        order.isDispatched &&
                                        !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={deliverHandler}>
                                                    Mark As Delivered
                                                        </Button>
                                            </ListGroup.Item>
                                        )}

                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        !order.isPaid && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={successPaymentHandler}>
                                                    Mark As Paid
                                                        </Button>
                                            </ListGroup.Item>
                                        )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )
            }
        </Container>
    )
}

export default OrderScreen