import axios from 'axios'
import {BaseUrl,ApiRoutes}  from '../Routes'

const EncuestaServices = {
  getPreguntas: function (): Promise<any> {
    return axios.get(BaseUrl+ApiRoutes.GET_PREGUNTAS)
  },
  // getUser: function (): Promise<any> {
  //   return axios.get(BaseUrl+ApiRoutes.GET_USER)
  // }
}

export default EncuestaServices;