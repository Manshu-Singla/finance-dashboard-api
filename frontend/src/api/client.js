import axios from 'axios'

import { getStoredUser } from '../utils/auth'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})

api.interceptors.request.use((config) => {
  const user = getStoredUser()

  if (user?.id) {
    config.headers['X-User-Id'] = user.id
  }

  return config
})

export default api
