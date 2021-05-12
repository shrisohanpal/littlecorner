import express from 'express'
const router = express.Router()
import
{
  getProducts,
  getProductsByShop,
  getProductsByVendor,
  getProductsByCat,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from '../controllers/productController.js'
import { protect, adminOrVendor } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, adminOrVendor, createProduct)
router.route('/byshop').get(getProductsByShop)
router.route('/byvendor').get(getProductsByVendor)
router.route('/bycat').get(getProductsByCat)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect, adminOrVendor, deleteProduct).put(protect, adminOrVendor, updateProduct)

export default router
