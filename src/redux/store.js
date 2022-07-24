import { configureStore } from '@reduxjs/toolkit'

import userReducer from './features/user/userSlice'
import apiReducer from './features/api/apiSlice'
import modalReducer from './features/modal/modalSlice'
import searchReducer from './features/search/searchSlice'
import singleApiReducer from './features/singleApi/singleApiSlice'
import subscriptionReducer from './features/subscription/subscriptionSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        apis: apiReducer,
        modal: modalReducer,
        search: searchReducer,
        singleApis: singleApiReducer,
        subscription: subscriptionReducer
    }
})