import axios from 'axios'

export default (content_type = 'application/json') => {
  let token = JSON.parse(localStorage.getItem('clinicsync'))
  const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': content_type,
      Authorization: `Bearer ${token}`
    }
  })

  return ApiClient
}
