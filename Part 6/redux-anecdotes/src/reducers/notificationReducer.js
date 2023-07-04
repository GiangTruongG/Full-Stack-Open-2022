import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: 'This is a notification!',
    display: 'none'
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return {
                ...state,
                message: action.payload
            }
        },
        displayNotification(state, action) {
            if (state.display === 'none') {
                return {
                    ...state,
                    display: 'block'
                }
            }
            return {
                ...state,
                display: 'none'
            }
        }
    }
})

export const showNotification = (content, time) => {
    return async dispatch => {
        const seconds = time * 1000
        dispatch(setNotification(content))
        dispatch(displayNotification())
        setTimeout(() => {
            dispatch(displayNotification())
          }, seconds)
    }
}

export const { setNotification, displayNotification } = notificationSlice.actions
export default notificationSlice.reducer
