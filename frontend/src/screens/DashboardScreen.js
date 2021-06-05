import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Carousel, Image, Container } from 'react-bootstrap'


const Box = ({ title, text, bgColor, redirect }) => {
    return (
        <Col xs={12} sm={6} md={4} lg={3} className='py-3 px-3'>
            <Card
                bg={bgColor}
                text='white'
                className="mb-2">
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Link to={redirect}>
                        <Card.Text style={{ color: '#ffffff' }}>
                            {text}
                        </Card.Text>
                    </Link >
                </Card.Body>
            </Card>
        </Col>
    )
}


const DashboardScreen = () => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Container>
            { userInfo && userInfo.isAdmin && (
                <>
                    <h2>Admin Dashboard</h2>
                    <Row>
                        <Box
                            title="Users List"
                            bgColor='primary'
                            text="Click Here to see the data all about users. Like: userId, user name, user email, about vendor and admin status..."
                            redirect='/admin/userlist'
                        />
                        <Box
                            title="Categories"
                            bgColor='success'
                            text="Click Here to see the data all about categories. You can create, read, update, delete the Categories from here."
                            redirect='/admin/categorylist'
                        />
                        <Box
                            title="Products List"
                            bgColor='danger'
                            text="Click Here to see the data all about Products. Like: productId, product name, and all the details about Products."
                            redirect='/admin/productlist'
                        />
                        <Box
                            title="Orders List"
                            bgColor='warning'
                            text="Click Here to see the data all about Orders. Like: orderId, Order Delivery Status, Payment Status, etc."
                            redirect='/admin/orderlist'
                        />
                        <Box
                            title="Blogs List"
                            bgColor='info'
                            text="Click Here to see the data all about Blogs. Like: blogId, Blog user, about Blogger and Blog status..."
                            redirect='/admin/bloglist'
                        />
                    </Row>
                </>
            )}


            { userInfo && userInfo.isVendor && (
                <>
                    <h2>Vendor Dashboard</h2>
                    <Row>
                        <Box
                            title="My Products"
                            bgColor='primary'
                            text="Click Here to see the data all about Products. Like: productId, product name, and all the details about Products."
                            redirect='/vendor/productlist'
                        />

                        <Box
                            title="My Orders"
                            bgColor='success'
                            text="Click Here to see the data all about Orders. Like: orderId, Order Delivery Status, Payment Status, etc."
                            redirect='/vendor/orderlist'
                        />
                    </Row>
                </>
            )}


            { userInfo && userInfo.isBlogger && (
                <>
                    <h2>Blogger Dashboard</h2>
                    <Row>
                        <Box
                            title="My Blogs"
                            bgColor='primary'
                            text="Click Here to see the data all about Blogs. Like: blogId, Blog posts, about Blogger and Blog status..."
                            redirect='/blogger/bloglist'
                        />

                        <Box
                            title="My Posts"
                            bgColor='success'
                            text="Click Here to see all your Posts. Like: postId, Post Blog, likes, comments, about post status, etc ..."
                            redirect='/blogger/postlist'
                        />
                    </Row>
                </>
            )}

        </Container>
    )
}

export default DashboardScreen