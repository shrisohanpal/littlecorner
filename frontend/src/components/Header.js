import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Form, Button, FormControl, Row, Image, NavDropdown } from 'react-bootstrap'
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
                <LinkContainer to='/' className='py-0 my-0'>
                    <Navbar.Brand>
                        <Image src='/logo.jpeg' style={{ width: 40, height: 40, borderRadius: 5, margin: 5 }} />
                        MLC
                    </Navbar.Brand>
                </LinkContainer>

                <NavDropdown title="Browse" id="basic-nav-dropdown">
                    {!loading && !error && (
                        <>
                            {categorys.map((category) => (
                                <LinkContainer to={`/productsbycat/${category._id}`}>
                                    <NavDropdown.Item key={category._id}>{category.name}</NavDropdown.Item>
                                </LinkContainer>
                            ))}
                        </>
                    )}
                </NavDropdown>
                {window.innerWidth > 768 &&
                    (
                        <><FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: window.innerWidth > 768 ? '55%' : '55%' }} onChange={e => setKeyword(e.target.value)} />
                            <Button type='submit'>Search</Button>
                        </>
                    )
                }

                <div onClick={getUserLocation}>
                    <Nav.Link className={window.innerWidth < 769 && 'px-0 mx-1'}>
                        <i className='fas fa-map-marker-alt' style={{ fontSize: 30 }}></i>
                    </Nav.Link>
                </div>
                <LinkContainer to='/cart'>
                    <Nav.Link className={window.innerWidth < 769 && 'px-0 mx-1'}>
                        <i className='fas fa-cart-plus' style={{ fontSize: 30 }}></i>
                    </Nav.Link>
                </LinkContainer>

            </Form>
        )
    }

    return (
        <header>
            <Container>
                <Row className='py-3 my-3'>
                    <Route render={({ history }) => <SearchBox history={history} />} />
                </Row>
            </Container>
            <Drawer anchor='left' open={drawerOpen} onClose={() => { setDrawerOpen(false) }}>
                <List style={{ width: 250 }}>
                    <ListItem>
                        <ListItemText primary={<div style={{ fontWeight: 'bold', fontSize: 20 }}>Little Corner</div>} />
                        <Button className='ml-auto' onClick={() => setDrawerOpen(false)}><i className='fas fa-times' /></Button>
                    </ListItem>
                    <Divider />
                    <ListItem />
                    <ListItem button>
                        <LinkContainer to={userInfo ? '/profile' : '/login'}>
                            <ListItemText primary="LOGIN OR SIGN UP" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/fg'>
                            <ListItemText primary="Track Order" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/fg'>
                            <ListItemText primary="Exchange / Return Order" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/fg'>
                            <ListItemText primary="Contact Us" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/fg'>
                            <ListItemText primary="Sell on Little Corner" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/fg'>
                            <ListItemText primary="Terms and Conditions" />
                        </LinkContainer>
                    </ListItem>
                    <ListItem button>
                        <LinkContainer to='/dashboard'>
                            <ListItemText primary="Go to Dashboard" />
                        </LinkContainer>
                    </ListItem>
                </List>
            </Drawer>
        </header>
    )
}

export default Header;
