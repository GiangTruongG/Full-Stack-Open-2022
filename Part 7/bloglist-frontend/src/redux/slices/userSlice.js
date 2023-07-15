import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.loggedInUser = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
