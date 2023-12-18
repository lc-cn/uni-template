import { defineStore } from "pinia";
import * as api from '@/api'
type UserInfo={
  username:string
  avatar?:string
  phone?:string
  openid?:string
  unionId?:string
}
export const useUserStore=defineStore('user',()=>{
  const isLogin=ref(false)
  const userInfo=ref<UserInfo>({username:''})
  const loginWithPwd=async (username:string,password:string)=>{
    isLogin.value=true
    userInfo.value.username=username
  }
  const loginWithOpenid=async ()=>{
    return new Promise<boolean>((resolve) =>{
      uni.getProvider({
        service:"oauth",
        fail:()=>resolve(false),
        success({ provider }){
          provider=Array.isArray(provider)?provider[0]:provider as any
          console.log(provider)
          uni.login({
            provider:provider as any,
            fail:()=>resolve(false),
            async success({code}){
              const appid=uni.getAccountInfoSync().miniProgram.appId
              const { data:res } = await api.code2Session(provider as unknown as string,appid, code).catch(()=>({data:undefined}))
              if(!res) return resolve(false)
              const result=await api.login({
                openid:res.openid,
                unionId:res.unionId
              })
              if(!result) return resolve(false)
              isLogin.value=true
              userInfo.value=result.data
              resolve(true)
            }
          })
        }
      })
    })
  }
  return {
    isLogin,
    userInfo,
    loginWithPwd,
    loginWithOpenid
  }
})
