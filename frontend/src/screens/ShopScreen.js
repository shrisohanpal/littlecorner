import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import { listShopDetails } from '../actions/shopActions'
import Message from '../components/Message'
import { listProductsByShop } from '../actions/productActions'
import OwlCarousel from 'react-owl-carousel';
import GoogleMapReact from 'google-map-react';
import { baseUrl } from '../urls'

const ShopScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const shopDetails = useSelector(state => state.shopDetails)
    const { loading: loadingShop, error: errorShop, shop } = shopDetails

    const categoryList = useSelector((state) => state.categoryList)
    const { loading: categoryLoading, error: categoryError, categorys } = categoryList

    const productListByShop = useSelector(state => state.productListByShop)
    const { loading: loadingProducts, error: errorProducts, products } = productListByShop

    useEffect(() => {
        const shopId = match.params.id
        dispatch(listShopDetails(shopId))
        dispatch(listProductsByShop(shopId))
    }, [dispatch, match])

    return (
        <Container>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loadingShop ?
                <CircularProgress /> :
                errorShop ? <Message varint='danger'>errorShop</Message>
                    :
                    (
                        <Row>
                            <Col md={6}>
                                <Image
                                    src={`${baseUrl}/api${shop.image}`}
                                    alt={shop.name} className='h-1' fluid />
                                <ListGroup>
                                    <ListGroup.Item>
                                        Address: {shop.address}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{shop.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Category: {categorys.find(c => c._id === shop.category) && categorys.find(c => c._id === shop.category).name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Phone: {shop.phone}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Email: {shop.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        GST: {shop.gstNumber}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {shop.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <GoogleMapReact style={{ height: 100 }}
                                    defaultCenter={{ lat: shop.latitude, lng: shop.longitude }}
                                    defaultZoom={11}
                                />
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

export default ShopScreen