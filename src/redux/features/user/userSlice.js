import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { useHttpRequest } from '../../../hooks/fetch-hook';


const url = process.env.REACT_APP_IDENTITY_URL

const initialState = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: null,

}

// export const updateCurrentUser = createAsyncThunk(
//     'user/update', async (user, userId) => {
//        const response = await fetch(`${identity_url}/user/${userId}`, {
//         method:'PATCH',
//         headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//         },
//        body: JSON.stringify(user, userId)
//     })
//     const result = await response.data
//     return result
// })

export const updateUser = (user, userId) => {
    return function (dispatch) {
          fetch(`${url}/user/${userId}`, user, {
            method:'PATCH',
            headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
           body:JSON.stringify(user, userId)
    }).then((resp) => {
        dispatch(updateProfile(resp.data));
    })
    .catch((error) => console.log(error))
    };
};






const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload
            state.isLoggedIn = true
        },
        logout: state => {
            state.user = initialState.user
            state.isLoggedIn = false
        },
        updateProfile: (state, { payload }) => {
           state.user = payload
           state.isLoading = false
    },
    
    },

})

export const { login, logout, signup, updateProfile } = userSlice.actions
export default userSlice.reducer