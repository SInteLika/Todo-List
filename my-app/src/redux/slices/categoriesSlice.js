import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import instance from "../../utils/axios";


export const getCategories = createAsyncThunk('categories/getCategories',
    async () => {
        const {data} = await instance.get('/categories')
        return data
    }
)


const initialState = {
    list: [],
    status: 'loading',
    isVisible: false,
    isVisibleDelCategories: false,
    activeCategories: {}
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategories: (state, action) => {
            state.list.push(action.payload)
            state.isVisible = false
        },
        changeVisible: (state) => {
            state.isVisible = !state.isVisible
        },
        changeActiveCategories: (state, action) => {
            state.activeCategories = action.payload
        },
        changeDelCategoriesVisible: (state) => {
            state.isVisibleDelCategories = !state.isVisibleDelCategories
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.list = action.payload
                    .map((e, index) => {
                        if (index === 0) {
                            e.active = true
                            state.activeCategories = e
                        } else e.active = false

                        return e
                    })
                state.status = 'ok'
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = 'err'
                console.log('Была ошибка')
            })
    }
})

// Action creators are generated for each case reducer function
export const {addCategories, changeVisible, changeActiveCategories,
    changeDelCategoriesVisible} = categoriesSlice.actions

export default categoriesSlice.reducer