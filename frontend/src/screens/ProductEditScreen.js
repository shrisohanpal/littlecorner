import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct, deleteProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { baseUrl } from '../urls'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [gst, setGst] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const [returnable, setReturnable] = useState(false)
  const [refundable, setRefundable] = useState(false)
  const [exchange, setExchange] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const categoryList = useSelector((state) => state.categoryList)
  const { loading: categoryLoading, error: categoryError, categorys } = categoryList

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.goBack()
    } else {
      if (!product._id || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.images[0])
        setImage2(product.images[1])
        setImage3(product.images[2])
        setBrand(product.brand)
        setCategory(categorys.find(c => c._id === product.category) && categorys.find(c => c._id === product.category).name)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setPrice(product.price)
        setGst(product.gst)
        setFinalPrice(product.finalPrice)
        setReturnable(product.returnable)
        setRefundable(product.refundable)
        setExchange(product.exchange)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

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

      const { data } = await axios.post(`${baseUrl}/api/upload`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFileHandler2 = async (e) => {
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

      const { data } = await axios.post(`${baseUrl}/api/upload`, formData, config)

      setImage2(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFileHandler3 = async (e) => {
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

      const { data } = await axios.post(`${baseUrl}/api/upload`, formData, config)

      setImage3(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        images: image2 ? image3 ? [image, image2, image3] : [image, image2] : [image],
        brand,
        category: categorys.find(c => c.name === category)._id,
        countInStock,
        description,
        price,
        gst,
        finalPrice,
        returnable,
        refundable,
        exchange
      })
    )
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
      history.goBack()
    }
  }

  return (
    <Container>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{product && product.name ? 'Edit' : 'Create'} Product</h1>
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

            <Form.Group controlId='image2'>
              <Form.Label>Image2</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler2}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId='image3'>
              <Form.Label>Image3</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler3}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category}
                //   onChange={(e) => setCategory(}>
                onChange={(e) => setCategory(e.target.value)}>
                <option key={category && category._id}>Select Category</option>
                {!categoryLoading && !categoryError && (
                  categorys.map((category) => (
                    <option key={category._id}>{category.name}</option>
                  ))
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='gst'>
              <Form.Label>GST</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter GST'
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='finalPrice'>
              <Form.Label>Final Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter final price'
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='exchange'>
              <Form.Label>Exchange Validity in days ( 0 means no exchange)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter exchange validity'
                value={exchange}
                onChange={(e) => setExchange(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='returnable'>
              <Form.Check
                type='checkbox'
                label='Returnable'
                checked={returnable}
                onChange={(e) => setReturnable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='refundable'>
              <Form.Check
                type='checkbox'
                label='Refundable'
                checked={refundable}
                onChange={(e) => setRefundable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button type='submit' variant='primary'>
                {product && product.name ? 'Update' : 'Create'}
              </Button>
              <Button variant='danger' onClick={() => deleteHandler(productId)}>
                {product && product.name ? 'Remove' : 'Cancel'}
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default ProductEditScreen