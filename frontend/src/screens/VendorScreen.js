import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import { listVendorDetails } from '../actions/vendorActions'
import Message from '../components/Message'
import { listProductsByVendor } from '../actions/productActions'
import OwlCarousel from 'react-owl-carousel';


const VendorScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const vendorDetails = useSelector(state => state.vendorDetails)
    const { loading: loadingVendor, error: errorVendor, vendor } = vendorDetails

    const productListByVendor = useSelector(state => state.productListByVendor)
    const { loading: loadingProducts, error: errorProducts, products } = productListByVendor

    useEffect(() => {
        const vendorId = match.params.id
        dispatch(listVendorDetails(vendorId))
        dispatch(listProductsByVendor(vendorId))
    }, [dispatch, match])


    return (
        <Container>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loadingVendor ?
                <CircularProgress /> :
                errorVendor ? <Message varint='danger'>{errorVendor}</Message>
                    :
                    (
                        <Row>
                            <Col md={6}>
                                <Image
                                    src={`/api${vendor.image}`}
                                    alt={vendor.name} className='h-1' fluid />
                                <ListGroup>
                                    <ListGroup.Item>
                                        Address: {vendor.address}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{vendor.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Email: {vendor.email}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {vendor.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>

                            </Col>
                        </Row>
                    )
            }
            <h3 className='my-2'>Our Products</h3>
            {loadingProducts ? (<CircularProgress />)
                : errorProducts
                    ? (<Message variant='danger'>{errorProducts}</Message>)
                    : (<OwlCarousel items={window.innerWidth > 780 ? 4 : 2}
                        className="owl-theme"
                        loop
                        nav
                        margin={8} autoplay={true} autoplayTimeout={2000}>
                        {products.map((product) => (
                            <div key={product._id}>
                                <Product product={product} />
                            </div>

                        ))}
                    </OwlCarousel>
                    )
            }
        </Container>
    )

}

export default VendorScreen