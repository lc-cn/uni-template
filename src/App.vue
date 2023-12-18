<script setup lang="ts">
import {onLaunch,onShow,onHide} from "@dcloudio/uni-app";
import { useUserStore } from "@/store/user";
const userStore=useUserStore()
onLaunch(()=>{
  console.log('App Launch')
  const pageStack=getCurrentPages()
  const currentPage=pageStack[pageStack.length-1]?.$page.fullPath||'/pages/index/index'
  const routeMethods=['navigateTo','navigateBack','redirectTo','switchTab']
  for(const method of routeMethods){
    uni.addInterceptor(method,{
      invoke(e){
        checkPermission(e.url)
      }
    })
  }
  checkPermission(currentPage)
})
onShow(()=>{
  console.log('App Show')
})
onHide(()=>{
  console.log('App Hide')
})
const whiteList:string[]=['/pages/login/index']
const checkPermission=async (url:string)=>{
  if(whiteList.includes(url.split('?')[0]) || userStore.isLogin) return
  uni.showLoading({
    title:'请稍后'
  })
  const autoLoginSuccess=await userStore.loginWithOpenid().catch(()=>false)
  if(!autoLoginSuccess){
    uni.showModal({
      title:'身份验证失败',
      content:'请先登录',
      confirmText:'立即登录',
      cancelText:'退出',
      success(result){
        uni.hideLoading()
        if(result.confirm){
          uni.redirectTo({
            url:'/pages/login/index?callback='+url,
            fail(e){
              console.error(e)
            }
          })
        }else{
          uni.exitMiniProgram()
        }
      }
    })
  }
}
</script>

<style lang="scss">
</style>
