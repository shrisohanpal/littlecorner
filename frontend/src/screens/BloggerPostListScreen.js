import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {
    listPosts,
    deletePost,
    createPost,
} from '../actions/postActions'
import { POST_CREATE_RESET } from '../constants/postConstants'

const PostListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const postList = useSelector((state) => state.postList)
    const { loading, error, posts, page, pages } = postList

    const postDelete = useSelector((state) => state.postDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = postDelete

    const postCreate = useSelector((state) => state.postCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        post: createdPost,
    } = postCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: POST_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/post/${createdPost._id}/edit`)
        } else {
            dispatch(listPosts('', pageNumber))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdPost,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deletePost(id))
        }
    }

    const createPostHandler = () => {
        dispatch(createPost())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>Posts</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createPostHandler}>
                        <i className='fas fa-plus'></i> Create Post
          </Button>
                </Col>
            </Row>
            {loadingDelete && <CircularProgress />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <CircularProgress />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>CREATED ON</th>
                                <th>UPDATED ON</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id}>
                                    <td>{post._id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.createdAt.substring(0, 10)}</td>
                                    <td>{post.createdAt.substring(0, 10)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/post/${post._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(post._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </Container>
    )
}

export default PostListScreen

//  Abhi k liye PostListScreen wala code copy kiya hai isme baad me change krna hai ye