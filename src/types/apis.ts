import { Dict } from "@/types/index";
import { UserInfo, UserLoginData } from "@/types/user";
export type FuncMap=Dict<(...args:any[])=>any>
export interface ApiMap extends FuncMap {
    '/code2session'(params: { provide: string;appId:string; code: string }): { openid: string; unionId?: string }
    '/login'(data: UserLoginData): UserInfo
}
