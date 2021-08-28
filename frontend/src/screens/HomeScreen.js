import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Carousel, Image, Container, Card, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import Product from '../components/Product'
import Vendor from '../components/Vendor'
import Blog from '../components/Blog'
import Message from '../components/Message'
import { listCategorys } from '../actions/categoryActions'
import { listProducts } from '../actions/productActions'
import { listVendors } from '../actions/vendorActions'
import { listBlogs } from '../actions/blogActions'
import { listPosts } from '../actions/postActions'
import OwlCarousel from 'react-owl-carousel';

const HomeScreen = () => {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading: loadingCategorys, error: errorCategorys, categorys } = categoryList

    const productList = useSelector(state => state.productList)
    const { loading: loadingProducts, error: errorProducts, products } = productList

    const vendorList = useSelector(state => state.vendorList)
    const { loading: loadingVendor, error: errorVendors, vendors } = vendorList

    const blogList = useSelector(state => state.blogList)
    const { loading: loadingBlogs, error: errorBlogs, blogs } = blogList

    const postList = useSelector(state => state.postList)
    const { loading: loadingPosts, error: errorPosts, posts } = postList

    useEffect(() => {
        dispatch(listCategorys())
        dispatch(listProducts())
        dispatch(listVendors())
        dispatch(listBlogs())
        dispatch(listPosts())
    }, [dispatch])

    return (
        <div className='my-3, px-0'>
            <Container>
                <h2 style={{ color: '#345159', fontWeight: 800 }}>Get Something Different</h2>
                <div style={{ height: 20 }} />
                <Row>
                    <Col xs={12} sm={12} lg={6} xl={6} style={{ padding: 10 }}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-1.jpg'} fluid />
                    </Col>
                    <Col xs={12} sm={12} lg={6} xl={6}>
                        <Row>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-4.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-5.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-2.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-3.jpg'} fluid />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <h2 className='pt-3 my-3' style={{ color: '#345159', fontWeight: 800 }}>My Little Corner Categories </h2>
                <Row>
                    {loadingCategorys ? (<CircularProgress />)
                        : errorCategorys
                            ? (<Message variant='danger'>{errorCategorys}</Message>)
                            :
                            categorys.map((singleCat) => (
                                <Col xs={12} sm={6} lg={4} xl={3}>
                                    <Card style={{ padding: 10, margin: 10 }}>
                                        <div style={{
                                            display: 'flex', flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Card.Img variant="top" style={{ width: 60, height: 60, borderRadius: 50 }} src={singleCat.image} />
                                            <Card.Title style={{ margin: 10 }}>{singleCat.name}</Card.Title>
                                        </div>
                                        {/*    <Card.Body>
                                            {singleCat.subCategories.map((singleSubCat) => (
                                                <Card.Text>{singleSubCat}</Card.Text>
                                            ))}
                                            </Card.Body> */}
                                    </Card>
                                </Col>
                            )
                            )
                    }
                </Row>
            </Container>

            <div style={{ margin: 0, padding: 0, backgroundColor: '#F5F5F5', width: '100%' }}>
                <center className='mt-3 pt-3'>
                    <h3 className='mt-3' style={{ color: '#345159', fontWeight: 800 }}>Trending Products</h3>
                </center>
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
            </div>
            <br />
            <br />
            {/* <center className='mt-3 pt-3'>
                <h3 className='mt-3'>Recently Updated Products</h3>
            </center>
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
            }*/}

            <Container>
                <h2 style={{ color: '#345159', fontWeight: 800 }}>Best of MLC</h2>
                <Row>
                    <Col xs={12} sm={12} lg={6} xl={6} style={{ padding: 10 }}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-10.jpg'} fluid />
                    </Col>
                    <Col xs={12} sm={12} lg={6} xl={6}>
                        <Row>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-8.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-7.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-6.jpg'} fluid />
                            </Col>
                            <Col xs={6} sm={6} lg={6} xl={6} style={{ padding: 10 }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} src={'/images/banners/mlc-9.jpg'} fluid />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <div style={{ margin: 0, padding: 0, backgroundColor: '#F5F5F5', width: '100%' }}>
                <center className='mt-3 pt-3'>
                    <h3 className='mt-3' style={{ color: '#345159', fontWeight: 800 }}>New Products</h3>
                </center>
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
            </div>


            <Container>
                <h2 className="py-3 my-3" style={{ color: '#345159', fontWeight: 800 }}>Little Corner Shopper Favourites</h2>
                <Row>
                    <Col xs={12} sm={6} lg={4} xl={4}>
                        <div style={{ margin: 10 }}>
                            <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/mlc-b.jpg'} />
                            {/*  <Card.Body>
                                <Card.Title>Editor's Pick: Immunity Boosters</Card.Title>
                                <Card.Text>Herbal Teas, Honey & More</Card.Text>
                            </Card.Body>
                          */}
                        </div>
                    </Col>

                    <Col xs={12} sm={6} lg={4} xl={4}>
                        <div style={{ margin: 10 }}>
                            <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/mlc-a.jpg'} />
                            {/* <Card.Body>
                                <Card.Title>Par-Tea Selections</Card.Title>
                                <Card.Text>Starting at INR 170</Card.Text>

                            </Card.Body>
                           */}
                        </div>
                    </Col>

                    <Col xs={12} sm={6} lg={4} xl={4}>
                        <div style={{ margin: 10 }}>
                            <Card.Img variant="top" style={{ borderRadius: 10 }} src={'/images/banners/mlc-c.jpg'} />
                            {/*   <Card.Body>
                                <Card.Title>Mission Declutter</Card.Title>
                                <Card.Text>Portable & Budget-Friendly Storage Organisers</Card.Text>
                            </Card.Body>
                         */}
                        </div>
                    </Col>
                </Row>



                <div style={{ margin: 0, padding: 0, backgroundColor: '#F5F5F5', width: '100%' }}>
                    <center className='mt-3 pt-3'>
                        <h3 className='mt-3' style={{ color: '#345159', fontWeight: 800 }}>Our Vendors</h3>
                    </center>
                    {loadingVendor ? (<CircularProgress />)
                        : errorVendors
                            ? (<Message variant='danger'>{errorVendors}</Message>)
                            : (<OwlCarousel items={window.innerWidth > 780 ? 4 : 2}
                                className="owl-theme"
                                loop
                                nav
                                margin={8} autoplay={true} autoplayTimeout={2000}>
                                {vendors.map((vendor) => (
                                    <div key={vendor._id}>
                                        <Vendor vendor={vendor} />
                                    </div>

                                ))}
                            </OwlCarousel>
                            )
                    }
                </div>



                <h3 className='my-2' style={{ color: '#345159', fontWeight: 800 }}>Featured Blogs</h3>
                {loadingBlogs ? (<CircularProgress />)
                    : errorBlogs
                        ? (<Message variant='danger'>{errorBlogs}</Message>)
                        : (<OwlCarousel items={window.innerWidth > 780 ? 4 : 2}
                            className="owl-theme"
                            loop
                            nav
                            margin={8} autoplay={true} autoplayTimeout={2000}>
                            {blogs.map((blog) => (
                                <div key={blog._id}>
                                    <Blog blog={blog} />
                                </div>

                            ))}
                        </OwlCarousel>
                        )
                }

                {
                    /*
                            <h3 className='my-2'>Recent Posts</h3>
                            <Row>
                                {loadingPosts ? (<CircularProgress />)
                                    : errorPosts
                                        ? (<Message variant='danger'>{errorPosts}</Message>)
                                        : posts.map((post) => (
                                            <Col xs={12} sm={6} lg={4} xl={3}>
                                                <Card style={{ padding: 10, margin: 10 }}>
                                                    <Card.Img variant="top" src={post.image} />
                                                    <Card.Body>
                                                        <Card.Title>{post.title}</Card.Title>
                                                        <Card.Text>{post.description.substring(0, 80)}.....</Card.Text>
                                                        <Link to={`/post/${post._id}`}>
                                                            <Button variant="primary">Read More</Button>
                                                        </Link>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                }
                            </Row>
                            */
                }
            </Container>
        </div>
    )
}

export default HomeScreen
// 600, 900, 1200