import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../utils/axios";


export const fetchLogin = createAsyncThunk('auth/fetchLogin',
    async (params, {rejectWithValue}) => {
        try {
            const {email, password} = params
            const {data} = await instance.post('auth/login', {
                email,
                password,
            })
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const authMe = createAsyncThunk('auth/authMe',
    async () => {
        if (!window.localStorage.getItem('token')) {
            return false
        }
        const {data} = await instance.get('auth/me')
        return data
    }
)


const initialState = {
    data: null,
    status: 'loading',
    error: false
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.data = null
        },
        registration: (state, action) => {
            state.data = action.payload
        },
        updateName: (state, action) => {
            state.data.fullName = action.payload
        },
        updateEmail: (state, action) => {
            state.data.email = action.payload
        },
        updatePhoto: (state, action) => {
            state.data.avatarUrl = action.payload
        },
        updateTheme: (state, action) => {
            state.data.theme = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.data = action.payload
                state.error = false
                state.status = 'ok'
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.error = true
            })
            .addCase(authMe.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'ok'
            })
            .addCase(authMe.rejected, (state, action) => {
                state.status = 'err'
                console.log('Пользователь не найден')
            })
    }
})


export const {logOut, registration, updateName, updateEmail, updatePhoto, updateTheme} = authSlice.actions
export default authSlice.reducer