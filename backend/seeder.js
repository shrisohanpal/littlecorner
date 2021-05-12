import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import colors from 'colors'

import users from './data/users.js'
import categorys from './data/categorys.js'
import shops from './data/shops.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Category from './models/categoryModel.js'
import Shop from './models/shopModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'


dotenv.config()

connectDB()

const importData = async () =>
{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Shop.deleteMany()
        await Category.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        const vendorUser = createdUsers[1]._id

        const sampleCategorys = categorys.map((category) =>
        {
            return { ...category, user: adminUser }
        })

        const createdCategorys = await Category.insertMany(sampleCategorys)
        const cat1 = createdCategorys[0]._id

        const sampleShops = shops.map((shop) =>
        {
            return { ...shop, user: adminUser, category: cat1 }
        })

        const createdShops = await Shop.insertMany(sampleShops)

        const sampleProducts = products.map((product) =>
        {
            return { ...product, user: vendorUser, category: cat1, shop: createdShops[0] }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () =>
{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await Shop.deleteMany()
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