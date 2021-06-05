import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
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

  const count = await Post.countDocuments({ ...keyword })
  const posts = await Post.find({ $or: [keyword, keyword2] }).sort({ updatedAt: -1 })
  //console.log(posts)
  res.json({ posts, page, pages: Math.ceil(count / pageSize) })
})



// @desc    Fetch all posts of a postger
// @route   GET /api/posts/bypostger
// @access  Public
const getPostsByPostger = asyncHandler(async (req, res) => {
  const userId = req.query.postgerId
  const posts = await Post.find({ user: userId })
  res.json({ posts })
})

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    user: req.user._id,
    // post: await Shop.findOne({ user: req.user._id }),
    image: '/uploads\\sample.jpg',
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image
  } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = title
    post.description = description
    post.image = image
    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create new review
// @route   POST /api/posts/:id/reviews
// @access  Private
const createPostReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    const alreadyReviewed = post.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Post already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    post.reviews.push(review)

    post.numReviews = post.reviews.length

    post.rating =
      post.reviews.reduce((acc, item) => item.rating + acc, 0) /
      post.reviews.length

    await post.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Get top rated posts
// @route   GET /api/posts/top
// @access  Public
const getTopPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ rating: -1 }).limit(3)

  res.json(posts)
})

export {
  getPosts,
  getPostsByPostger,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  createPostReview,
  getTopPosts,
}
