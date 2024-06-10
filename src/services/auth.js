import axios from 'axios'

export default (content_type = 'application/json') => {
  const AuthClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': content_type
    }
  })

  return AuthClient
}
