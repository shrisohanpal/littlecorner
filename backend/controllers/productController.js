import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Shop from '../models/shopModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10000
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const keyword2 = req.query.keyword
    ? {
      description: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ $or: [keyword, keyword2] }).sort({ updatedAt: -1 })

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all products of a shop
// @route   GET /api/products/byshop
// @access  Public
const getProductsByShop = asyncHandler(async (req, res) => {
  const shopId = req.query.shopId
  const products = await Product.find({ shop: shopId })
  res.json({ products })
})

// @desc    Fetch all products of a vendor
// @route   GET /api/products/byvendor
// @access  Public
const getProductsByVendor = asyncHandler(async (req, res) => {
  const userId = req.query.vendorId
  const products = await Product.find({ user: userId })
  res.json({ products })
})

// @desc    Fetch all products of a category
// @route   GET /api/products/bycat
// @access  Public
const getProductsByCat = asyncHandler(async (req, res) => {
  const catId = req.query.catId
  const products = await Product.find({ category: catId })
  res.json({ products })
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    shop: await Shop.findOne({ user: req.user._id }),
    image: ['/uploads\\sample.jpg', '/uploads\\sample.jpg', '/uploads\\sample.jpg'],
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    description,
    images,
    brand,
    price,
    gst,
    finalPrice,
    countInStock,
    returnable,
    refundable,
    exchange
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.shop = await Shop.findOne({ user: req.user._id })
    product.name = name
    product.category = category
    product.description = description
    product.images = images
    product.brand = brand
    product.price = price
    product.gst = gst
    product.finalPrice = finalPrice
    product.countInStock = countInStock
    product.returnable = returnable
    product.refundable = refundable
    product.exchange = exchange
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductsByShop,
  getProductsByVendor,
  getProductsByCat,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
