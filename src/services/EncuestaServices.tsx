import axios from 'axios'
import { Data, Login, Visita } from '../constants/interfaces';
import { BaseUrl, ApiRoutes } from '../Routes'

const EncuestaServices = {
  login: function (data: Login): Promise<any> {
    return axios.post(BaseUrl + ApiRoutes.LOGIN, data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  },
  postRespuestas: function (token: string, data: Data, source:any): Promise<any> {
    return axios.post(BaseUrl + ApiRoutes.POST_RESPUESTAS, data,
      {
        cancelToken:source,
        timeout:5000,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  getPreguntas: function (token: string): Promise<any> {
    return axios.get(BaseUrl + ApiRoutes.GET_PREGUNTAS,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  getCursos: function (token: string): Promise<any> {
    return axios.get(BaseUrl + ApiRoutes.GET_CURSOS,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  getEscuelas: function (token: string): Promise<any> {
    return axios.get(BaseUrl + ApiRoutes.GET_ESCUELAS,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  getParentesco: function (token: string): Promise<any> {
    return axios.get(BaseUrl + ApiRoutes.GET_PARENTESCO,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  getParametros:function(token:string):Promise<any>{
    return axios.get(BaseUrl + ApiRoutes.GET_PARAMETROS,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }) 
  },
  postListRespuestas: function (token: string, data: Data[]): Promise<any> {
    return axios.post(BaseUrl + ApiRoutes.POST_LIST_RESPUESTAS, data,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  postVisita:function(token:string,data:Visita,source:any):Promise<any>{
    return axios.post(BaseUrl + ApiRoutes.POST_VISITA, data,
      {
        cancelToken:source,
        timeout:5000,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  },
  postListVisita:function(token:string,data:Visita[]):Promise<any>{
    return axios.post(BaseUrl + ApiRoutes.POST_LIST_VISITA, data,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
  }
  // getUser: function (): Promise<any> {
  //   return axios.get(BaseUrl+ApiRoutes.GET_USER)
  // }
}

export default EncuestaServices;