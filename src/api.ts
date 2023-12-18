import {useAxios} from "@/utils/request";
import { ApiMap } from "@/types/apis";
import { UserLoginData } from "@/types/user";
const axios=useAxios<ApiMap>()
export async function code2Session(provide:string,appId,code:string){
  return axios.get('/code2session',{params:{provide,appId,code}})
}
export async function login(data:UserLoginData){
  return axios.post('/login',data)
}
