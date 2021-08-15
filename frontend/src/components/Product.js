import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 pt-3 rounded' style={{ margin: 10, boxShadow: '2px 5px 10px #000000' }} >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Image style={{ display: 'block', width: '100%', height: 150 }} src={`${product.images[0]}`} variant='top' fluid />

                <div style={{ backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
                    <Card.Body className='px-3'>
                        <Card.Title as='div' style={{ display: 'block', height: 20, overflow: 'hidden', color: '#345159' }}>
                            <strong>{product.name}</strong>
                        </Card.Title>

                        <Card.Text as='div'>
                            <Rating
                                value={product.rating}
                                text={` ${product.numReviews} reviews`}
                            />
                        </Card.Text>
                        <Card.Text as='h6' style={{ color: '#345159' }}>₹ {product.price}</Card.Text>
                        <Button style={{ backgroundColor: '#345159', width: '100%' }}>Know More</Button>
                    </Card.Body>
                </div>
            </Link>
        </Card>
    )
}

export default Product