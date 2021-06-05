import express from 'express'
const router = express.Router()
import {
    getPosts,
    getPostsByPostger,
    getPostById,
    deletePost,
    createPost,
    updatePost,
    createPostReview,
} from '../controllers/postController.js'
import { protect, adminOrBlogger } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(protect, adminOrBlogger, createPost)
router.route('/bypostger').get(getPostsByPostger)
router.route('/:id/reviews').post(protect, createPostReview)
router.route('/:id').get(getPostById).delete(protect, adminOrBlogger, deletePost).put(protect, adminOrBlogger, updatePost)

export default router
