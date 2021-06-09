// export const API_URL = 'https://metaweather-proxy-api.herokuapp.com/api/location';

// export function GET_WOEID_BY_NAME(cityName) {
//   return {
//     url: API_URL + `/search/?query=${cityName}`,
//     options: {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     },
//   };
// }

// export function GET_WOEID_BY_LATLONG(lat, long) {
//   return {
//     url: API_URL + `/search/?lattlong=${lat},${long}`,
//     options: {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   };
// }

// export function GET_WEATHER_BY_WOEID(woeid) {
//   return {
//     url: API_URL + `/${woeid}`,
//     options: {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   };
// }


import axios from 'axios'

const api = axios.create({
  baseURL: 'https://metaweather-proxy-api.herokuapp.com/api/location'
})


export default api
