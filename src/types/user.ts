export interface UserInfo{
  username:string
  avatar?:string
}
export type UserLoginData=(Pick<UserInfo, 'username'> & {
  password:string
}) | {
  openid:string
  unionId?:string
}
