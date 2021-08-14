import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Card, Button, Carousel, Form } from 'react-bootstrap'
import { listPostDetails } from '../actions/postActions'
import { CircularProgress } from '@material-ui/core'
import Message from '../components/Message'


const PostScreen = ({ match }) => {

    const dispatch = useDispatch()

    const postDetails = useSelector(state => state.postDetails)
    const { loading, error, post } = postDetails

    useEffect(() => {
        if (!post._id || post._id !== match.params.id) {
            dispatch(listPostDetails(match.params.id))
        }
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
                                <h2>{post.title}</h2>
                            </center>
                            <div style={{ height: 400, margin: 20 }}>
                                <Image style={{ display: 'block', width: '100%', height: '100%', borderRadius: '1%', margin: '0%' }}
                                    src={`${post.image}`}
                                    alt={post.name} fluid />
                            </div>
                            <p>{post.description}</p>
                            <div style={{ height: 100 }} />
                        </>
                    )
            }
        </Container>
    )
}

export default PostScreen