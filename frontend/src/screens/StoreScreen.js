import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal';
import { Container, Row, Col, Image, Table, Card, Button, Form } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { baseUrl } from '../urls'

const StoreScreen = ({ history }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const changeState = () => {
        setIsOpen(!modalIsOpen)
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            //marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const registerHandler = () => {
        if (userInfo) {
            changeState()
        } else {
            history.push('/login?redirect=store')
        }
    }

    const [loading, setLoading] = useState(false)
    const confirmHandler = async () => {
        //  console.log('Confor Handler Called')
        setLoading(true)
        await axios.post(`${baseUrl}/api/users/registerseller/${userInfo._id}`)
        setLoading(false)
        history.push('/')
    }

    return (
        <Container>
            <h2 className='text-center'>How to Sell?</h2>
            <hr /><hr />
            <Row className='text-center'>
                <Col md={4}>
                    <h3 >1. Create your Account</h3>
                    <Image src={'/images/store/createaccount.jpg'} />
                    <p>To become a Kalpavrikshcart seller,all you need a GST number and bank account.</p>
                </Col>
                <Col md={4}>
                    <h3 >2. Add your Products</h3>
                    <Image src={'/images/store/addproduct.jpg'} />
                    <p>List your Products for crores of customer and businesses to purchase</p>
                </Col>
                <Col md={4}>
                    <h3 >3. Start Selling</h3>
                    <Image src={'/images/store/startselling.jpg'} />
                    <p>Payments will be done directly and securly into your bank account</p>
                </Col>
            </Row>
            <center>
                <Button type='button' onClick={registerHandler}>Register as a Seller</Button>
            </center>
            <Modal
                isOpen={modalIsOpen}
                //  onAfterOpen={afterOpenModal}
                //  onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <Form>
                    <div className='py-3 m-3' style={{ minWidth: 200 }}>
                        <h5>You Will be able to Add Your Shop and Products with this account when admin will allow you. </h5>
                    </div>
                    <h5 className=' mx-3'>
                        {loading ?
                            <CircularProgress /> :
                            'Are you sure ?'
                        }
                    </h5>
                    <Button type='button' className='mx-3' onClick={confirmHandler}>Confirm</Button>
                    <Button type='button' variant='danger' className='mx-3' onClick={changeState}>Cancel</Button>
                </Form>
            </Modal>
        </Container>
    )
}

export default StoreScreen