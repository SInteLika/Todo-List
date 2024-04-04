import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import instance from "../../utils/axios";
import FulfilledTaskIcon from "../../component/MainPage/Page/Task/FulfilledTaskIcon/FulfilledTaskIcon";


export const getTask = createAsyncThunk('task/getTask',
    async (id) => {
        const {data} = await instance.get(`/categories/task/${id}`)
        return data
    }
)


const initialState = {
    taskActive: [],
    taskFulfilled: [],
    isVisible: false,
    isVisibleDelTask: false,
    isVisibleChangeTask: false,
    selectTask: {},
    status: 'loading'
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        changeVisibleAddTask: (state) => {
            state.isVisible = !state.isVisible
        },
        changeVisibleDelTask: (state) => {
            state.isVisibleDelTask = !state.isVisibleDelTask
        },
        changeVisibleChangeTask: (state) => {
            state.isVisibleChangeTask = !state.isVisibleChangeTask
        },
        addActiveTask: (state, action) => {
            state.taskActive.push(action.payload)
        },
        changeVisibleIcon: (state, action) => {
            const index = state[action.payload.task].findIndex( e => e._id === action.payload._id)
            state[action.payload.task][index].isActive = !state[action.payload.task][index].isActive
        },
        changeSelectTask: (state, action) => {
            state.selectTask = action.payload
        },
        delTask: (state, action) => {
            state.taskActive = state.taskActive.filter(e => e._id !== action.payload)
        },
        updateTask: (state, action) => {
            const index = state.taskActive.findIndex(e => e._id === state.selectTask.id)
            state.taskActive[index].name = action.payload
        },
        fulfilledTask: (state, action) => {
            state.taskFulfilled.push(action.payload)
        },
        clearAllTask: (state, action) => {
            state.taskActive = []
            state.taskFulfilled = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTask.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.taskActive = action.payload.taskActive
                state.taskFulfilled = action.payload.taskFulfilled
                state.status = 'ok'
            })
            .addCase(getTask.rejected, (state, action) => {
                state.status = 'err'
                console.log('Была ошибка')
            })
    }
})

// Action creators are generated for each case reducer function
export const {changeVisibleAddTask, addActiveTask, changeVisibleIcon, changeVisibleDelTask,
    changeSelectTask, delTask, changeVisibleChangeTask, updateTask, fulfilledTask, clearAllTask } = taskSlice.actions

export default taskSlice.reducer