import axios from 'axios'

const api = axios.create({
  baseURL: 'https://metaweather-proxy-api.herokuapp.com/api/location'
})

export default api
