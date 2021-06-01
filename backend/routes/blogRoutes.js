import express from 'express'
const router = express.Router()
import {
    getBlogs,
    getBlogsByBlogger,
    getBlogById,
    deleteBlog,
    createBlog,
    updateBlog,
    createBlogReview,
} from '../controllers/blogController.js'
import { protect, adminOrBlogger } from '../middleware/authMiddleware.js'

router.route('/').get(getBlogs).post(protect, adminOrBlogger, createBlog)
router.route('/byblogger').get(getBlogsByBlogger)
router.route('/:id/reviews').post(protect, createBlogReview)
router.route('/:id').get(getBlogById).delete(protect, adminOrBlogger, deleteBlog).put(protect, adminOrBlogger, updateBlog)

export default router
