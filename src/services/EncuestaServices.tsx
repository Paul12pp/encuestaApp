import axios from 'axios'
import Storage from '../constants/Storage';
import { BaseUrl, ApiRoutes } from '../Routes'

interface Login {
  email: string;
  password: string;
}
const EncuestaServices = {
  getPreguntas: function (token:string): Promise<any> {
    return axios.get(BaseUrl + ApiRoutes.GET_PREGUNTAS)
  },
  // getUser: function (): Promise<any> {
  //   return axios.get(BaseUrl+ApiRoutes.GET_USER)
  // }
  login: function (data: Login): Promise<any> {
    return axios.post(BaseUrl + ApiRoutes.LOGIN, data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
}

export default EncuestaServices;