import asyncHandler from 'express-async-handler'
import Blog from '../models/blogModel.js'

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
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

  const count = await Blog.countDocuments({ ...keyword })
  const blogs = await Blog.find({ $or: [keyword, keyword2] }).sort({ updatedAt: -1 })

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch all blogs of a shop
// @route   GET /api/blogs/byshop
// @access  Public
const getBlogsByShop = asyncHandler(async (req, res) => {
  const shopId = req.query.shopId
  const blogs = await Blog.find({ shop: shopId })
  res.json({ blogs })
})

// @desc    Fetch all blogs of a vendor
// @route   GET /api/blogs/byvendor
// @access  Public
const getBlogsByVendor = asyncHandler(async (req, res) => {
  const userId = req.query.vendorId
  const blogs = await Blog.find({ user: userId })
  res.json({ blogs })
})

// @desc    Fetch all blogs of a category
// @route   GET /api/blogs/bycat
// @access  Public
const getBlogsByCat = asyncHandler(async (req, res) => {
  const catId = req.query.catId
  const blogs = await Blog.find({ category: catId })
  res.json({ blogs })
})


// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    await blog.remove()
    res.json({ message: 'Blog removed' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    user: req.user._id,
    // shop: await Shop.findOne({ user: req.user._id }),
    image: ['/uploads\\sample.jpg', '/uploads\\sample.jpg', '/uploads\\sample.jpg'],
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
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

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.shop = await Shop.findOne({ user: req.user._id })
    blog.name = name
    blog.category = category
    blog.description = description
    blog.images = images
    blog.brand = brand
    blog.price = price
    blog.gst = gst
    blog.finalPrice = finalPrice
    blog.countInStock = countInStock
    blog.returnable = returnable
    blog.refundable = refundable
    blog.exchange = exchange
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create new review
// @route   POST /api/blogs/:id/reviews
// @access  Private
const createBlogReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    const alreadyReviewed = blog.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Blog already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    blog.reviews.push(review)

    blog.numReviews = blog.reviews.length

    blog.rating =
      blog.reviews.reduce((acc, item) => item.rating + acc, 0) /
      blog.reviews.length

    await blog.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Get top rated blogs
// @route   GET /api/blogs/top
// @access  Public
const getTopBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ rating: -1 }).limit(3)

  res.json(blogs)
})

export {
  getBlogs,
  getBlogsByShop,
  getBlogsByVendor,
  getBlogsByCat,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
  getTopBlogs,
}
