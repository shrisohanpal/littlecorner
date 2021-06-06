import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'

const Blog = ({ blog }) => {
    return (
        <Card className='my-3 p-1 rounded' style={{ display: 'block', width: '100%', height: 250 }}>
            <Link to={`/blog/${blog._id}`}>
                <Image style={{ display: 'block', width: '100%', height: 150 }} src={`${blog.image}`} variant='top' fluid />
                <Card.Body>
                    <Card.Title as='div'>
                        <strong>{blog.title}</strong>
                    </Card.Title>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Blog