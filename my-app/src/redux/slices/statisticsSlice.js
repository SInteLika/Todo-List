import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import instance from "../../utils/axios";
import getNextMonday from "../../utils/getNextMonday";


export const getStatistics = createAsyncThunk('statistics/getTask',
    async () => {
        const {data} = await instance.patch(`/statistics`, {
            weekData: getNextMonday()
        })
        return data
    }
)
const initialState = {
    data: {
        lastWeekCreated: 0,
        lastWeekFulfilled: 0,
        lastWeekDeleted: 0,
        mostCreated: [],
        mostFulfilled: []
    },
    status: 'loading'
}

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        updateStatistics: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStatistics.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getStatistics.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'ok'
            })
            .addCase(getStatistics.rejected, (state, action) => {
                state.status = 'err'
                console.log('Была ошибка')
            })
    }
})

// Action creators are generated for each case reducer function
export const {updateStatistics} = statisticsSlice.actions

export default statisticsSlice.reducer