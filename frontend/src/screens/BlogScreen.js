import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, Carousel, Form } from 'react-bootstrap'
import { listBlogDetails } from '../actions/blogActions'
import { CircularProgress } from '@material-ui/core'
import Message from '../components/Message'
import { listPosts } from '../actions/postActions'
import OwlCarousel from 'react-owl-carousel';

const BlogScreen = ({ match }) => {

    const dispatch = useDispatch()

    const blogDetails = useSelector(state => state.blogDetails)
    const { loading, error, blog } = blogDetails


    const postList = useSelector(state => state.postList)
    const { loading: loadingPosts, error: errorPosts, posts } = postList


    useEffect(() => {
        if (!blog._id || blog._id !== match.params.id) {
            dispatch(listBlogDetails(match.params.id))
        }
        dispatch(listPosts())

    }, [dispatch, match])


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
                        <>
                            <center>
                                <h2>{blog.title}</h2>
                            </center>
                            <div style={{ height: 400, margin: 20 }}>
                                <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '1%', margin: '0%' }}
                                    src={`${blog.image}`}
                                    alt={blog.name} fluid />
                            </div>
                            <p>{blog.description}</p>

                            <center className='mt-3 pt-3'>
                                <h3 className='mt-3'> Posts</h3>
                            </center>

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

                        </>
                    )
            }
        </Container>
    )
}

export default BlogScreen