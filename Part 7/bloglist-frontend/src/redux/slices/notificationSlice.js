import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  show: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.content = action.payload.content
      state.show = action.payload.show
    }
  }

})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
