import express from 'express'
const router = express.Router()
import {
  getVendors,
  //getVendorsByShop,
  getVendorsByVendor,
  getVendorsByCat,
  getVendorById,
  deleteVendor,
  createVendor,
  updateVendor,
  createVendorReview,
} from '../controllers/vendorController.js'
import { protect, adminOrVendor } from '../middleware/authMiddleware.js'

router.route('/').get(getVendors).post(protect, adminOrVendor, createVendor)
//router.route('/byshop').get(getVendorsByShop)
router.route('/byvendor').get(getVendorsByVendor)
router.route('/bycat').get(getVendorsByCat)
router.route('/:id/reviews').post(protect, createVendorReview)
router.route('/:id').get(getVendorById).delete(protect, adminOrVendor, deleteVendor).put(protect, adminOrVendor, updateVendor)

export default router
