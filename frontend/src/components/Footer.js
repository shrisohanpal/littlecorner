import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ marginTop: 10, background: '#0000ff' }}>
            <Navbar bg="dark" variant="dark">
                <Col style={{ color: 'white' }} className='text-center py-3'>
                    Copyright &copy; Little Corner <br />
                </Col>
            </Navbar>
        </footer>
    )
}

export default Footer