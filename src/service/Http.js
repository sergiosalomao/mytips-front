import axios from 'axios'

export const http = axios.create({
  // baseURL: `${process.env.VUE_APP_HOST}`
  baseURL: 'http://192.168.0.100:8002/api/'
})
// http.interceptors.request.use((config) => {
//   const token =  window.localStorage.getItem('access_token')

//   if (token) {
//     config.headers.Authorization = `${token}`
//   }

//   return config
// },(error) => {
//   return Promise.reject(error);
// })
