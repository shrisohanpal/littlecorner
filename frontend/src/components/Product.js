import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded' >
            <Link to={`/product/${product._id}`}>
                <Image style={{ display: 'block', width: '100%', height: 150 }} src={`${product.images[0]}`} variant='top' fluid />
                <Card.Body>
                    <Card.Title as='div' style={{ display: 'block', height: 20, overflow: 'hidden' }}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as='h3'>₹ {product.price}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Product