import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Carousel, Image, Container } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import Shop from '../components/Shop'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { listShops } from '../actions/shopActions'
import OwlCarousel from 'react-owl-carousel';

const HomeScreen = () =>
{
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading: loadingProducts, error: errorProducts, products } = productList

    const shopList = useSelector(state => state.shopList)
    const { loading: loadingShops, error: errorShops, shops } = shopList

    useEffect(() =>
    {
        dispatch(listProducts())
        dispatch(listShops)
    }, [dispatch])

    return (
        <>
            <Carousel pause='hover' style={{ margin: 0, display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', paddingTop: 0 }}>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src={'/images/banners/a.jpg'}
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src={'/images/banners/b.jpg'}
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: window.innerWidth < 780 ? 150 : 300 }} >
                        <img
                            style={{ margin: 0, padding: 0, height: '100%', width: '100%', borderRadius: 0 }}
                            src={'/images/banners/c.jpg'}
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
            <Container>
                <h3 className='my-2'>Featured Shops</h3>
                {loadingShops ? (<CircularProgress />)
                    : errorShops
                        ? (<Message variant='danger'>{errorProducts}</Message>)
                        : (<OwlCarousel items={window.innerWidth > 780 ? 4 : 2}
                            className="owl-theme"
                            loop
                            nav
                            margin={8} autoplay={true} autoplayTimeout={2000}>
                            {shops.map((shop) => (
                                <div key={shop._id}>
                                    <Shop shop={shop} />
                                </div>
                            ))}
                        </OwlCarousel>
                        )
                }
                <Row>
                    <Col sm={12} md={4} className='p-2'>
                        <Image src={'/images/banners/ba.jpg'} fluid />
                    </Col>
                    <Col sm={12} md={4} className='p-2'>
                        <Image src={'/images/banners/bb.jpg'} fluid />
                    </Col>
                    <Col sm={12} md={4} className='p-2'>
                        <Image src={'/images/banners/bc.jpg'} fluid />
                    </Col>
                </Row>
                <h3 className='my-2'>Featured Products</h3>
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
            <Image style={{ minHeight: 100 }} src={'/images/banners/cc.jpg'} fluid />
        </>
    )
}

export default HomeScreen
// 600, 900, 1200