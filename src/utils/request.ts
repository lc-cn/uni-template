import {baseURL} from '@/config'
import axios, { AxiosInstance, AxiosInterceptorManager, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type {AxiosRequestConfig} from 'axios'
import {createUniAppAxiosAdapter} from "@uni-helper/axios-adapter";
import { FuncMap } from "@/types/apis";
export interface CustomAxiosInstance<T extends FuncMap> extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  }
  get<K extends keyof T>(url: K, config?: AxiosRequestConfig & { params: Parameters<T[K]>[0] }): Promise<AxiosResponse<ReturnType<T[K]>>>
  get<D = any, R = any>(url: string & Exclude<string, keyof T>, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>>
  post<K extends keyof T>(
    url: K,
    data: Parameters<T[K]>[0],
    config?: AxiosRequestConfig<Parameters<T[K]>[0]>
  ): Promise<AxiosResponse<ReturnType<T[K]>>>
  post<D = any, R = any>(url: string & Exclude<string, keyof T>, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>>
  patch<K extends keyof T>(
    url: K,
    data: Parameters<T[K]>[0],
    config?: AxiosRequestConfig<Parameters<T[K]>[0]>
  ): Promise<AxiosResponse<ReturnType<T[K]>>>
  patch<D = any, R = any>(url: string & Exclude<string, keyof T>, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>>
  put<K extends keyof T>(
    url: K,
    data: Parameters<T[K]>[0],
    config?: AxiosRequestConfig<Parameters<T[K]>[0]>
  ): Promise<AxiosResponse<ReturnType<T[K]>>>
  put<D = any, R = any>(url: string & Exclude<string, keyof T>, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>>
  delete<K extends keyof T>(url: K, config?: AxiosRequestConfig & { params: Parameters<T[K]>[0] }): Promise<AxiosResponse<ReturnType<T[K]>>>
  delete<D = any, R = any>(url: string & Exclude<string, keyof T>, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<R>>
}
export function useAxios<T extends FuncMap=FuncMap>(config?:AxiosRequestConfig){
  const request= axios.create({
    baseURL,
    adapter:createUniAppAxiosAdapter(),
    ...config
  }) as CustomAxiosInstance<T>
  request.interceptors.response.use((res)=>{
    return res
  },(err)=>{
    uni.hideLoading()
    return Promise.reject(err)
  })
  return request
}
export default axios.create({
  baseURL,
  adapter:createUniAppAxiosAdapter(),
  headers:{
    "Content-Type":'application/json'
  }
})
