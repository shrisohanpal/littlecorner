import express from 'express'
const router = express.Router()
import {
getBlogs,
getBlogsByShop,
getBlogsByVendor,
getBlogsByCat,
getBlogById,
deleteBlog,
createBlog,
updateBlog,
createBlogReview,
} from '../controllers/blogController.js'
import { protect, adminOrVendor } from '../middleware/authMiddleware.js'

router.route('/').get(getBlogs).post(protect, adminOrVendor, createBlog)
router.route('/byshop').get(getBlogsByShop)
router.route('/byvendor').get(getBlogsByVendor)
router.route('/bycat').get(getBlogsByCat)
router.route('/:id/reviews').post(protect, createBlogReview)
router.route('/:id').get(getBlogById).delete(protect, adminOrVendor, deleteBlog).put(protect, adminOrVendor, updateBlog)

export default router
