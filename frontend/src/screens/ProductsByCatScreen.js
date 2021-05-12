import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { listProductsByCat } from '../actions/productActions'

const ProductsByCatScreen = ({ match }) =>
{
    const catId = match.params.id
    const dispatch = useDispatch()

    const productListByCat = useSelector((state) => state.productListByCat)
    const { loading, error, products } = productListByCat

    useEffect(() =>
    {
        dispatch(listProductsByCat(catId))
    }, [dispatch, catId])

    return (
        <Container>
            <Meta />
            <Link to='/' className='btn btn-light'>
                Go Back
            </Link>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    )
}

export default ProductsByCatScreen