import asyncHandler from 'express-async-handler'
import Vendor from '../models/vendorModel.js'
//import Shop from '../models/shopModel.js'

// @desc    Fetch all vendors
// @route   GET /api/vendors
// @access  Public
const getVendors = asyncHandler(async (req, res) => {
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

  const count = await Vendor.countDocuments({ ...keyword })
  const vendors = await Vendor.find({ $or: [keyword, keyword2] }).sort({ updatedAt: -1 })

  res.json({ vendors, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all vendors of a shop
// @route   GET /api/vendors/byshop
// @access  Public
/*const getVendorsByShop = asyncHandler(async (req, res) => {
  const shopId = req.query.shopId
  const vendors = await Vendor.find({ shop: shopId })
  res.json({ vendors })
})*/

// @desc    Fetch all vendors of a vendor
// @route   GET /api/vendors/byvendor
// @access  Public
const getVendorsByVendor = asyncHandler(async (req, res) => {
  const userId = req.query.vendorId
  const vendors = await Vendor.find({ user: userId })
  res.json({ vendors })
})

// @desc    Fetch all vendors of a category
// @route   GET /api/vendors/bycat
// @access  Public
const getVendorsByCat = asyncHandler(async (req, res) => {
  const catId = req.query.catId
  const vendors = await Vendor.find({ category: catId })
  res.json({ vendors })
})


// @desc    Fetch single vendor
// @route   GET /api/vendors/:id
// @access  Public
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    res.json(vendor)
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Delete a vendor
// @route   DELETE /api/vendors/:id
// @access  Private/Admin
const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    await vendor.remove()
    res.json({ message: 'Vendor removed' })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Private/Admin
const createVendor = asyncHandler(async (req, res) => {
  const vendor = new Vendor({
    user: req.user._id,
    // shop: await Shop.findOne({ user: req.user._id }),
    image: ['/uploads\\sample.jpg', '/uploads\\sample.jpg', '/uploads\\sample.jpg'],
  })

  const createdVendor = await vendor.save()
  res.status(201).json(createdVendor)
})

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Private/Admin
const updateVendor = asyncHandler(async (req, res) => {
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

  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    // vendor.shop = await Shop.findOne({ user: req.user._id })
    vendor.name = name
    vendor.category = category
    vendor.description = description
    vendor.images = images
    vendor.brand = brand
    vendor.price = price
    vendor.gst = gst
    vendor.finalPrice = finalPrice
    vendor.countInStock = countInStock
    vendor.returnable = returnable
    vendor.refundable = refundable
    vendor.exchange = exchange
    const updatedVendor = await vendor.save()
    res.json(updatedVendor)
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Create new review
// @route   POST /api/vendors/:id/reviews
// @access  Private
const createVendorReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const vendor = await Vendor.findById(req.params.id)

  if (vendor) {
    const alreadyReviewed = vendor.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Vendor already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    vendor.reviews.push(review)

    vendor.numReviews = vendor.reviews.length

    vendor.rating =
      vendor.reviews.reduce((acc, item) => item.rating + acc, 0) /
      vendor.reviews.length

    await vendor.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Vendor not found')
  }
})

// @desc    Get top rated vendors
// @route   GET /api/vendors/top
// @access  Public
const getTopVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({}).sort({ rating: -1 }).limit(3)

  res.json(vendors)
})

export {
  getVendors,
  //  getVendorsByShop,
  getVendorsByVendor,
  getVendorsByCat,
  getVendorById,
  deleteVendor,
  createVendor,
  updateVendor,
  createVendorReview,
  getTopVendors,
}
