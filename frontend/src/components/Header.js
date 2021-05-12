import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Form, Button, FormControl, Row, Col, NavDropdown } from 'react-bootstrap'
import { Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import { listCategorys } from '../actions/categoryActions'

const Header = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.categoryList)
    const { loading, error, categorys } = categoryList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listCategorys())
    }, [dispatch])

    const SearchBox = ({ history }) => {
        const [keyword, setKeyword] = useState('')

        const getUserLocation = () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", typeof (position.coords.latitude));
                console.log("Longitude is :", position.coords.longitude);
                alert(`Location is Captured Successfully! \n Latitude is : ${position.coords.latitude} \n Longitude is : ${position.coords.longitude}`)
            });
        }

        const submitHandler = (e) => {
            e.preventDefault()
            if (keyword.trim()) {
                history.push(`/search/${keyword}`)
            } else {
                history.push('/')
            }
        }
        return (
            <Form onSubmit={submitHandler} inline style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Button className='mx-3' onClick={() => { setDrawerOpen(true) }}>
                    <i className='fas fa-bars' />
                </Button>
                <NavDropdown title="Browse" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: window.innerWidth > 768 ? '50%' : '55%' }} onChange={e => setKeyword(e.target.value)} />
                <Button type='submit'>Search</Button>
                <div onClick={getUserLocation}>
                    <Nav.Link>
                        <i className='fas fa-map-marker-alt' style={{ fontSize: 30 }}></i>
                    </Nav.Link>
                </div>
                <LinkContainer to='/cart'>
                    <Nav.Link>
                        <i className='fas fa-cart-plus' style={{ fontSize: 30 }}></i>
                    </Nav.Link>
                </LinkContainer>

            </Form>
        )
    }

    return (
        <header>
            <Container>
                <Navbar expand="lg" className='py-0'>
                    <Nav className="m-auto">
                        <LinkContainer to='/' className='py-0 my-0'>
                            <Navbar.Brand>
                                <text style={{ fontSize: 30 }}>
                                    Little Corner
                                </text>
                            </Navbar.Brand>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                <Row className='py-3'>
                    <Route render={({ history }) => <SearchBox history={history} />} />
                </Row>
            </Container>
        </header>
    )
}

export default Header;
