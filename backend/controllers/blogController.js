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
  //console.log(blogs)
  res.json({ blogs, page, pages: Math.ceil(count / pageSize) })
})



// @desc    Fetch all blogs of a blogger
// @route   GET /api/blogs/byblogger
// @access  Public
const getBlogsByBlogger = asyncHandler(async (req, res) => {
  const userId = req.query.bloggerId
  const blogs = await Blog.find({ user: userId })
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
    // blog: await Shop.findOne({ user: req.user._id }),
    image: '/uploads\\sample.jpg',
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image
  } = req.body

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.title = title
    blog.description = description
    blog.image = image
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
  getBlogsByBlogger,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
  getTopBlogs,
}
