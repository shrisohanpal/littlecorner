import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ForgotPassword from './screens/ForgotPassword'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import StoreScreen from './screens/StoreScreen'
import ProductScreen from './screens/ProductScreen'
import ProductsScreen from './screens/ProductsScreen'
import ProductsByCatScreen from './screens/ProductsByCatScreen'
import ProductEditScreen from './screens/ProductEditScreen'

import VendorScreen from './screens/VendorScreen'
import BlogScreen from './screens/BlogScreen'
import BlogListScreen from './screens/BlogListScreen'
import BlogEditScreen from './screens/BlogEditScreen'


import PostScreen from './screens/PostScreen'
import BloggerPostListScreen from './screens/BloggerPostListScreen'
import PostEditScreen from './screens/PostEditScreen'

import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

import DashboardScreen from './screens/DashboardScreen'
// import Cate from './screens/Categ'
// import ShopListScreen from './screens/ShopList'

import ProductListScreen from './screens/ProductListScreen'
import OrderListScreen from './screens/OrderListScreen'

import VendorsProductListScreen from './screens/VendorsProductListScreen'
import VendorsOrderListScreen from './screens/VendorsOrderListScreen'
import BloggerBlogListScreen from './screens/BloggerBlogListScreen'

import PrivacypolicyScreen from './screens/PrivacypolicyScreen'
import ReturnPolicyScreen from './screens/ReturnPolicyScreen'
import TermsAndConditions from './screens/TermsAndConditions'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-0' style={{ marginTop: '90px' }}>

        <Route path='/' component={HomeScreen} exact />

        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/forgotpassword' component={ForgotPassword} />

        <Route path='/store' component={StoreScreen} />
        <Route path='/product/:id?' component={ProductScreen} />
        <Route path='/vendor/:id?' component={VendorScreen} />
        <Route path='/search/:keyword' component={ProductsScreen} exact />
        <Route path='/productsbycat/:id' component={ProductsByCatScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/order/:id' component={OrderScreen} />

        <Route path='/blog/:id' component={BlogScreen} />
        <Route path='/post/:id' component={PostScreen} />

        <Route path='/dashboard' component={DashboardScreen} />

        <Route path='/admin/userlist' component={UserListScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route path='/admin/categorylist' component={CategoryListScreen} />
        <Route path='/admin/category/:id/edit' component={CategoryEditScreen} />
        <Route path='/admin/productlist' component={ProductListScreen} />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/admin/bloglist' component={BlogListScreen} />
        <Route path='/admin/blog/:id/edit' component={BlogEditScreen} />
        <Route path='/admin/post/:id/edit' component={PostEditScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />

        <Route path='/vendor/productlist' component={VendorsProductListScreen} />
        <Route path='/vendor/orderlist' component={VendorsOrderListScreen} />

        <Route path='/blogger/bloglist' component={BloggerBlogListScreen} />
        <Route path='/blogger/postlist' component={BloggerPostListScreen} />

        <Route path='/privacypolicy' component={PrivacypolicyScreen} />
        <Route path='/returnpolicy' component={ReturnPolicyScreen} />
        <Route path='/termsandconditions' component={TermsAndConditions} />
      </main>
      <Footer />
    </Router>
  )
}

export default App