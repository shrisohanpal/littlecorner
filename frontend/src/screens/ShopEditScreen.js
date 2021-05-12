import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listShopDetails, updateShop } from '../actions/shopActions'
import { SHOP_UPDATE_RESET } from '../constants/shopConstants'
import { baseUrl } from '../urls'

const ShopEditScreen = ({ match, history }) => {
  const shopId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [aadharNumber, setAadharNumber] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [gstNumber, setGstNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const shopDetails = useSelector((state) => state.shopDetails)
  const { loading, error, shop } = shopDetails

  const shopUpdate = useSelector((state) => state.shopUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shopUpdate

  const categoryList = useSelector((state) => state.categoryList)
  const { loading: categoryLoading, error: categoryError, categorys } = categoryList

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SHOP_UPDATE_RESET })
      history.goBack()
    } else {
      if (!shop._id || shop._id !== shopId) {
        dispatch(listShopDetails(shopId))
      } else {
        setName(shop.name)
        setImage(shop.image)
        setCategory(shop.category && categorys.find(c => c._id === shop.category).name)
        setAddress(shop.address)
        setLatitude(shop.latitude)
        setLongitude(shop.longitude)
        setAadharNumber(shop.aadharNumber)
        setPanNumber(shop.panNumber)
        setGstNumber(shop.gstNumber)
        setPhone(shop.phone)
        setEmail(shop.email)
        setDescription(shop.description)
      }
    }
  }, [dispatch, history, shopId, shop, successUpdate])

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateShop({
        _id: shopId,
        name,
        image,
        category: categorys && categorys.find(c => c.name === category) && categorys.find(c => c.name === category)._id,
        address,
        latitude,
        longitude,
        aadharNumber,
        panNumber,
        gstNumber,
        phone,
        email,
        description,
      })
    )
  }

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      alert(`Location Added Successfully! \n Latitide: ${position.coords.latitude} \n Longitude: ${position.coords.longitude}`)
    });
  }

  return (
    <Container>
      <Link to='/admin/shoplist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{shop && shop.name ? 'Edit' : 'Create'} Shop</h1>
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

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category}
                //   onChange={(e) => setCategory(}>
                onChange={(e) => setCategory(e.target.value)}>
                <option>Select Category</option>
                {!categoryLoading && !categoryError && (
                  categorys.map((category) => (
                    <option key={category._id}>{category.name}</option>
                  ))
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Button className='mx-3' onClick={handleLocation}>Add Location</Button>
            </Form.Group>

            <Form.Group controlId='aadhar'>
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Aadhar Number'
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='panNumber'>
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter PAN Number'
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='gstNumber'>
              <Form.Label>GST Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter GST Number'
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
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

            <Button type='submit' variant='primary'>
              {shop && shop.name ? 'Update' : 'Create'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default ShopEditScreen