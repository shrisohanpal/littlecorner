import express from 'express'
const router = express.Router()
import
{
    getShops,
    getShopByVendor,
    getShopById,
    deleteShop,
    createShop,
    updateShop
} from '../controllers/shopController.js'
import { protect, adminOrVendor } from '../middleware/authMiddleware.js'

router.route('/').get(getShops).post(protect, adminOrVendor, createShop)
router.route('/vendor/:id').get(protect, adminOrVendor, getShopByVendor)
router.route('/:id').get(getShopById).delete(protect, adminOrVendor, deleteShop).put(protect, adminOrVendor, updateShop)

export default router