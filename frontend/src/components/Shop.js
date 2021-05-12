import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'
import { baseUrl } from '../urls'

const Shop = ({ shop }) => {
    return (
        <Card className='my-3 p-1 rounded' style={{ display: 'block', width: '100%', height: 250 }}>
            <Link to={`/shopscreen/${shop._id}`}>
                <Image style={{ display: 'block', width: '100%', height: 150 }} src={`${baseUrl}/api${shop.image}`} variant='top' fluid />
                <Card.Body>
                    <Card.Title as='div'>
                        <strong>{shop.name}</strong>
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Shop
