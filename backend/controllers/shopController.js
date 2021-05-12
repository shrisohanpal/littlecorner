import asyncHandler from 'express-async-handler'
import Shop from '../models/shopModel.js'

// @desc    Fetch all shops
// @route   GET /api/shops
// @access  Public
const getShops = asyncHandler(async (req, res) => {
    const shops = await Shop.find({}).sort({ updatedAt: -1 })
    res.json({ shops })
})

// @desc    Fetch shop By Vendor
// @route   GET /api/shops/vendor/:id
// @access  Private AdminOrVenodr
const getShopByVendor = asyncHandler(async (req, res) => {
    const shop = await Shop.findOne({ user: req.params.id })
    if (shop) {
        res.json(shop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// @desc    Fetch single shop
// @route   GET /api/shops/:id
// @access  Public
const getShopById = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id)

    if (shop) {
        res.json(shop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// @desc    Delete a shop
// @route   DELETE /api/shops/:id
// @access  Private AdminOrVendor
const deleteShop = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id)

    if (shop) {
        await shop.remove()
        res.json({ message: 'Shop removed' })
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// @desc    Create a shop
// @route   POST /api/shops
// @access  Private AdminOrVendor
const createShop = asyncHandler(async (req, res) => {
    const shop = new Shop({
        user: req.user._id,
        image: '/uploads/default.png'
    })

    const createdShop = await shop.save()

    res.status(201).json(createdShop)
})

// @desc    Update a shop
// @route   PUT /api/shops/:id
// @access  Private AdminOrVendor
const updateShop = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        category,
        address,
        latitude,
        longitude,
        aadharNumber,
        panNumber,
        gstNumber,
        phone,
        email,
        description
    } = req.body

    const shop = await Shop.findById(req.params.id)

    if (shop) {
        shop.name = name
        shop.image = image
        shop.category = category
        shop.address = address
        shop.latitude = latitude
        shop.longitude = longitude
        shop.aadharNumber = aadharNumber
        shop.panNumber = panNumber
        shop.gstNumber = gstNumber
        shop.phone = phone
        shop.email = email
        shop.description = description

        const updatedShop = await shop.save()
        res.json(updatedShop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})


export {
    getShops,
    getShopByVendor,
    getShopById,
    deleteShop,
    createShop,
    updateShop
}