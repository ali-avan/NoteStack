// src/lib/axios.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api', // makes axios.get('/notes/get') -> /api/notes/get
})

export default instance
