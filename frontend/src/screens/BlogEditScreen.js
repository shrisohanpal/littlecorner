import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listBlogDetails, updateBlog, deleteBlog } from '../actions/blogActions'
import { BLOG_UPDATE_RESET } from '../constants/blogConstants'


const BlogEditScreen = ({ match, history }) => {
    const blogId = match.params.id

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const blogDetails = useSelector((state) => state.blogDetails)
    const { loading, error, blog } = blogDetails

    const blogUpdate = useSelector((state) => state.blogUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = blogUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BLOG_UPDATE_RESET })
            history.goBack()
        } else {
            if (!blog._id || blog._id !== blogId) {
                dispatch(listBlogDetails(blogId))
            } else {
                setTitle(blog.title)
                setImage(blog.image)
                setDescription(blog.description)
            }
        }
    }, [dispatch, history, blogId, blog, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post(`/api/upload`, formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateBlog({
                _id: blogId,
                title,
                image: image,
                description
            })
        )
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteBlog(id))
            history.goBack()
        }
    }

    return (
        <Container>
            <Link to='/admin/bloglist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>{blog && blog.title ? 'Edit' : 'Create'} Blog</h1>
                {loadingUpdate && <CircularProgress />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='title'
                                placeholder='Enter title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <CircularProgress />}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                // type='text'
                                as='textarea'
                                rows='10'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button type='submit' variant='primary'>
                                {blog && blog.title ? 'Update' : 'Create'}
                            </Button>
                            <Button variant='danger' onClick={() => deleteHandler(blogId)}>
                                {blog && blog.title ? 'Remove' : 'Cancel'}
                            </Button>
                        </div>
                    </Form>
                )}
            </FormContainer>
        </Container>
    )
}

export default BlogEditScreen