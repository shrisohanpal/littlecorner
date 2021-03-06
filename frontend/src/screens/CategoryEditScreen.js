import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Table, Image } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [subCats, setSubCats] = useState([])
  const [newSubCat, setNewSubCat] = useState('')
  const [newSubSubCat, setNewSubSubCat] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/admin/categorylist')
    } else {
      if (!category || !category._id || category._id !== categoryId) {
        dispatch(listCategoryDetails(categoryId))
      } else {
        setName(category.name)
        setImage(category.image)
        setSubCats(category.subCategories)
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate])

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
      updateCategory({
        _id: categoryId,
        name,
        image,
        subCategories: subCats
      })
    )
  }

  const deleteHandler = (inputSubCat) => {
    setSubCats([...subCats.filter((subCat) => subCat !== inputSubCat)])
  }

  const deleteHandler2 = (inputSubCat, inputSubSubCat) => {

    const xxx = subCats.find((subCat) => subCat.name == inputSubCat)
    const xx = xxx.subSubCats.filter((subSubCat) => subSubCat !== inputSubSubCat)

    subCats.forEach(subCat => {
      if (subCat.name == inputSubCat) {
        subCat.subSubCats = xx
      }
    });

    setSubCats([...subCats])
  }

  const addSubSubHandler = (inputSubCat, inputSubSubCat) => {
    const xxx = subCats.find((subCat) => subCat.name == inputSubCat)
    xxx.subSubCats = [...(xxx.subSubCats), inputSubSubCat]
    setSubCats([...subCats])
    setNewSubSubCat('')
  }

  return (
    <Container>
      <Link to='/admin/categorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{category && category.name ? 'Edit' : 'Create'} Category</h1>
        {loadingUpdate && <CircularProgress />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <h4 className="my-3">Sub Categories</h4>
            <Table bordered responsive className='table-sm'>
              <tbody>
                {subCats.map((subCat) => (
                  <tr>
                    <td>
                      <h5>{subCat.name}</h5>
                      <Table striped hover responsive className='table-sm'>
                        <tbody>
                          {subCat.subSubCats.map((subSubCat) =>
                            <tr>
                              <td>
                                <h6>{subSubCat}</h6>
                              </td>
                              <td>
                                <Button
                                  variant='danger'
                                  className='btn-sm'
                                  onClick={() => deleteHandler2(subCat.name, subSubCat)}
                                >
                                  <i className='fas fa-trash'></i>
                                </Button>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td>
                              <Form.Control
                                type='name'
                                placeholder='Add new Sub-Sub Category'
                                value={newSubSubCat}
                                onChange={(e) => setNewSubSubCat(e.target.value)}
                              ></Form.Control>
                            </td>
                            <td><Button variant='primary' className='btn-sm'
                              onClick={() => addSubSubHandler(subCat.name, newSubSubCat)}
                            >
                              <i className='fas fa-plus-circle'></i>
                            </Button></td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(subCat)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <Form.Control
                      type='name'
                      placeholder='Add new Sub Category'
                      value={newSubCat}
                      onChange={(e) => setNewSubCat(e.target.value)}
                    ></Form.Control>
                  </td>
                  <td><Button variant='primary' className='btn-sm'
                    onClick={() => { setSubCats([...subCats, { name: newSubCat, subSubCats: [] }]); setNewSubCat('') }}
                  >
                    <i className='fas fa-plus-circle'></i>
                  </Button></td>
                </tr>
              </tbody>
            </Table>
            <Button type='submit' variant='primary'>
              {category && category.name ? 'Update' : 'Create'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default CategoryEditScreen
