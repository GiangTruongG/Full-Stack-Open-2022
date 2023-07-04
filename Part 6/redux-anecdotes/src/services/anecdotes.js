import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const newAnecdote = {
        "content": anecdote,
        "votes": 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateVotesAnecdote = async (id) => {
    const toUpdateAnecdote = await axios.get(`${baseUrl}/${id}`)
    const updatedAnecdote = {
        ...toUpdateAnecdote.data,
        "votes": toUpdateAnecdote.data.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default { getAll, createAnecdote, updateVotesAnecdote }
