import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Carousel, Image, Container, Card, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import Shop from '../components/Shop'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { listShops } from '../actions/shopActions'
import OwlCarousel from 'react-owl-carousel';

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading: loadingProducts, error: errorProducts, products } = productList

    const shopList = useSelector(state => state.shopList)
    const { loading: loadingShops, error: errorShops, shops } = shopList

    useEffect(() => {
        dispatch(listProducts())
        dispatch(listShops)
    }, [dispatch])

    return (
        <Container className='my-3 py-3'>
            <h2>Find Something Different</h2>
            <div style={{ height: 50 }} />
            <Row>
                <Col xs={12} sm={12} lg={6} xl={6} style={{ padding: 10 }}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/1.webp'} fluid />
                </Col>
                <Col xs={12} sm={12} lg={6} xl={6}>
                    <Row>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/2.webp'} fluid />
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/3.webp'} fluid />
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/4.webp'} fluid />
                        </Col>
                        <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/5.webp'} fluid />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <h2>Little Corner Picks</h2>

            <Row>
                <Col xs={12} sm={6} lg={4} xl={3}>
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} xl={3} >
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} xl={3}>
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} xl={3} >
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={4} xl={3}>
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} xl={3} >
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} lg={4} xl={3}>
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4} xl={3} >
                    <Card style={{ padding: 10, margin: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={'/images/banners/women.webp'} />
                            <Card.Title style={{ margin: 10 }}>Women's Fashion</Card.Title>
                        </div>
                        <Card.Body>
                            <Card.Text>Apparel</Card.Text>
                            <Card.Text>Footwear</Card.Text>
                            <Card.Text>Bags</Card.Text>
                            <Card.Text>Jewellery</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="py-3 my-3">Little Corner Shopper Favourites</h2>

            <Row>
                <Col xs={12} sm={6} lg={4} xl={4}>
                    <div style={{ margin: 10 }}>
                        <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/herbal.webp'} />
                        <Card.Body>
                            <Card.Title>Editor's Pick: Immunity Boosters</Card.Title>
                            <Card.Text>Herbal Teas, Honey & More</Card.Text>

                        </Card.Body>
                    </div>
                </Col>

                <Col xs={12} sm={6} lg={4} xl={4}>
                    <div style={{ margin: 10 }}>
                        <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/lemon.webp'} />
                        <Card.Body>
                            <Card.Title>Par-Tea Selections</Card.Title>
                            <Card.Text>Starting at INR 170</Card.Text>

                        </Card.Body>
                    </div>
                </Col>

                <Col xs={12} sm={6} lg={4} xl={4}>
                    <div style={{ margin: 10 }}>
                        <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/wood.webp'} />
                        <Card.Body>
                            <Card.Title>Mission Declutter</Card.Title>
                            <Card.Text>Portable & Budget-Friendly Storage Organisers</Card.Text>

                        </Card.Body>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default HomeScreen
// 600, 900, 1200