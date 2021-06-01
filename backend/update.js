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

const update = async () => {
    await User.updateMany({ isBlogger: false })
}

update()