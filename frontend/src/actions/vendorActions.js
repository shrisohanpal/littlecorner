import axios from 'axios'
import {
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_BY_SHOP_REQUEST,
  VENDOR_LIST_BY_SHOP_SUCCESS,
  VENDOR_LIST_BY_SHOP_FAIL,
  VENDOR_LIST_BY_VENDOR_REQUEST,
  VENDOR_LIST_BY_VENDOR_SUCCESS,
  VENDOR_LIST_BY_VENDOR_FAIL,
  VENDOR_LIST_BY_CATEGORY_REQUEST,
  VENDOR_LIST_BY_CATEGORY_SUCCESS,
  VENDOR_LIST_BY_CATEGORY_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DELETE_SUCCESS,
  VENDOR_DELETE_REQUEST,
  VENDOR_DELETE_FAIL,
  VENDOR_CREATE_REQUEST,
  VENDOR_CREATE_SUCCESS,
  VENDOR_CREATE_FAIL,
  VENDOR_UPDATE_REQUEST,
  VENDOR_UPDATE_SUCCESS,
  VENDOR_UPDATE_FAIL,
  VENDOR_CREATE_REVIEW_REQUEST,
  VENDOR_CREATE_REVIEW_SUCCESS,
  VENDOR_CREATE_REVIEW_FAIL,
  VENDOR_TOP_REQUEST,
  VENDOR_TOP_SUCCESS,
  VENDOR_TOP_FAIL,
} from '../constants/vendorConstants'
import { logout } from './userActions'

export const listVendors = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: VENDOR_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/vendors?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVendorsByShop = (shopId) => async (
  dispatch
) => {
  try {
    dispatch({ type: VENDOR_LIST_BY_SHOP_REQUEST })

    const { data } = await axios.get(
      `/api/vendors/byshop?shopId=${shopId}`
    )

    dispatch({
      type: VENDOR_LIST_BY_SHOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_BY_SHOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVendorsByVendor = (vendorId) => async (
  dispatch
) => {
  try {
    dispatch({ type: VENDOR_LIST_BY_VENDOR_REQUEST })

    const { data } = await axios.get(
      `/api/vendors/byvendor?vendorId=${vendorId}`
    )

    dispatch({
      type: VENDOR_LIST_BY_VENDOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_BY_VENDOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVendorsByCat = (catId) => async (
  dispatch
) => {
  try {
    dispatch({ type: VENDOR_LIST_BY_CATEGORY_REQUEST })

    const { data } = await axios.get(
      `/api/vendors/bycat?catId=${catId}`
    )

    dispatch({
      type: VENDOR_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVendorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/vendors/${id}`)

    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteVendor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/vendors/${id}`, config)

    dispatch({
      type: VENDOR_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDOR_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createVendor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/vendors`, {}, config)

    dispatch({
      type: VENDOR_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDOR_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateVendor = (vendor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/vendors/${vendor._id}`,
      vendor,
      config
    )

    dispatch({
      type: VENDOR_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDOR_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createVendorReview = (vendorId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: VENDOR_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/vendors/${vendorId}/reviews`, review, config)

    dispatch({
      type: VENDOR_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VENDOR_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopVendors = () => async (dispatch) => {
  try {
    dispatch({ type: VENDOR_TOP_REQUEST })

    const { data } = await axios.get(`/api/vendors/top`)

    dispatch({
      type: VENDOR_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VENDOR_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
