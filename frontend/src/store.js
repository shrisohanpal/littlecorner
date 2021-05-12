import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import
{
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userForgotPasswordReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import
{
    categoryListReducer,
    categoryDetailsReducer,
    categoryDeleteReducer,
    categoryCreateReducer,
    categoryUpdateReducer
} from './reducers/categoryReducers'
import
{
    shopListReducer,
    shopByVendorReducer,
    shopDetailsReducer,
    shopDeleteReducer,
    shopCreateReducer,
    shopUpdateReducer,
} from './reducers/shopReducers'
import
{
    productListReducer,
    productListByShopReducer,
    productListByVendorReducer,
    productListByCatReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import
{
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDispatchReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
    orderListByVendorReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userForgotPassword: userForgotPasswordReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,

    shopList: shopListReducer,
    shopByVendor: shopByVendorReducer,
    shopDetails: shopDetailsReducer,
    shopDelete: shopDeleteReducer,
    shopCreate: shopCreateReducer,
    shopUpdate: shopUpdateReducer,

    productList: productListReducer,
    productListByShop: productListByShopReducer,
    productListByVendor: productListByVendorReducer,
    productListByCat: productListByCatReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDispatch: orderDispatchReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderListByVendor: orderListByVendorReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
