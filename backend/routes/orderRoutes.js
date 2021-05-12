import express from 'express'
const router = express.Router()
import
{
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDispatched,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrdersByVendor
} from '../controllers/orderController.js'
import { protect, admin, vendor } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/byvendor').get(protect, vendor, getOrdersByVendor)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/dispatch').put(protect, admin, updateOrderToDispatched)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
