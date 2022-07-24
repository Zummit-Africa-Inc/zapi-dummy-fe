import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const identity_url = process.env.REACT_APP_IDENTITY_URL

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
          fetch(`${identity_url}/user/${userId}`, user, {
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

// export const updateUser = createAsyncThunk(
//    ' user/updateUser',
//    async(user, {rejectWithValue}) => {
//     try{
//         const {_userId, fullName, email} = user
//         const response = await fetch(`${identity_url}/user/${_userId}`,{
//             fullName,
//             email,
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             }, body: JSON.stringify(user)
//         })
//         return response.data;
//     }catch(error){
//         console.log(error)
//         return rejectWithValue(error.response.data)
//     }
//    }
// )


// export const getUserProfile = createAsyncThunk('user/getUserProfile',
//  async({ userId, fullName, email }) => {
//     return fetch(`${identity_url}/user/${userId}`,{
//         method: "PATCH",
//         headers: {
//             Accept: "application.json",
//             "Content-type": "application.json"
//         },
//         body:JSON.stringify({
//             fullName,
//             email
//         }),
//     }).then((res) => res.json());
//  });




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
        updateProfile: (state, action) => {
           state.user = action.payload
           state.isLoading = false
    },
       

    },
    // extraReducers: {
    //     [updateCurrentUser.fulfilled]: (state, action) => {
    //         state.user = {
    //             ...state,user,
    //             fullName: action.payload.fullName,
    //             email: action.payload.email
    //         }
    //     }
    // }
})

export const { login, logout, signup, updateProfile } = userSlice.actions
export default userSlice.reducer