import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import colors from 'colors'

import users from './data/users.js'
import categorys from './data/categorys.js'
import blogs from './data/blogs.js'
import posts from './data/posts.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Category from './models/categoryModel.js'
import Blog from './models/blogModel.js'
import Post from './models/postModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'


dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Post.deleteMany()
        await Blog.deleteMany()
        await Category.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        const vendorUser = createdUsers[1]._id

        const sampleCategorys = categorys.map((category) => {
            return { ...category, user: adminUser }
        })

        const createdCategorys = await Category.insertMany(sampleCategorys)
        const cat1 = createdCategorys[0]._id

        const sampleBlogs = blogs.map((blog) => {
            return { ...blog, user: adminUser }
        })
        await Blog.insertMany(sampleBlogs)

        const samplePosts = posts.map((post) => {
            return { ...post, user: adminUser }
        })
        await Post.insertMany(samplePosts)

        const sampleProducts = products.map((product) => {
            return { ...product, user: vendorUser, category: cat1 }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Post.deleteMany()
        await Blog.deleteMany()
        await Category.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}