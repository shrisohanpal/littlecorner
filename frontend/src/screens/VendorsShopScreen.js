import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import
{
    getShopByVendor,
    deleteShop,
    createShop
} from '../actions/shopActions'
import { SHOP_CREATE_RESET } from '../constants/shopConstants'

const VendorsShopScreen = ({ history, match }) =>
{
    const dispatch = useDispatch()

    const shopByVendor = useSelector((state) => state.shopByVendor)
    const { loading, error, shop } = shopByVendor

    const shopDelete = useSelector((state) => state.shopDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = shopDelete

    const shopCreate = useSelector((state) => state.shopCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        shop: createdShop,
    } = shopCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>
    {
        dispatch({ type: SHOP_CREATE_RESET })

        if (!userInfo || !userInfo.isVendor) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/shop/${createdShop._id}/edit`)
        } else {
            dispatch(getShopByVendor(userInfo._id))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdShop,
    ])

    const deleteHandler = (id) =>
    {
        if (window.confirm('Are you sure')) {
            dispatch(deleteShop(id))
        }
    }

    const createShopHandler = () =>
    {
        dispatch(createShop())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>My Shop</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createShopHandler} disabled={shop}>
                        <i className='fas fa-plus'></i> Create Shop
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
            ) : shop && (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PHONE</th>
                                <th>EMAIL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>{shop._id}</td>
                            <td>{shop.name}</td>
                            <td>{shop.phone}</td>
                            <td>{shop.email}</td>
                            <td>
                                <LinkContainer to={`/admin/shop/${shop._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(shop._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )
}

export default VendorsShopScreen