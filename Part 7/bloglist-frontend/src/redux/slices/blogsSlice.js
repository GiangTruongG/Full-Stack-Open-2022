import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload.updatedBlog : blog)
    },
    deleteBlog(state, action) {
      const newState = state.filter(blog => blog.id !== action.payload)
      return newState
    }
  }
})

export const { setBlogs, likeBlog, deleteBlog } = blogsSlice.actions
export default blogsSlice.reducer
