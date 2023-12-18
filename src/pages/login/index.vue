<script setup>
import SafeArea from "@/components/safeArea.vue";
import { useUserStore } from "@/store/user";
const userStore=useUserStore()
const username=ref('')
const password=ref('')
const callbackUrl=ref('')
onLoad((query)=>{
  callbackUrl.value=query.callback||'/pages/index/index'
})
const toLogin=()=>{
  userStore.loginWithPwd(username.value,password.value).then(()=>{
    uni.redirectTo({
      url:callbackUrl.value,
      fail(){
        uni.switchTab({
          url:callbackUrl.value
        })
      }
    })
  })
}
const formReset=()=>{
  username.value=''
  password.value=''
}
</script>

<template>
  <safe-area classes="login-page" with-menu>
    <form class="login-form" @submit="toLogin" @reset="resetForm">
      <view>用户名：<input type="text" v-model="username"></view>
      <view>密码：<input type="password" v-model="password"></view>
      <view>
        <button form-type="submit" type="primary">登录</button>
        <button form-type="reset" type="default">重置</button>
      </view>
    </form>
  </safe-area>
</template>

<style lang="scss">
.login-page{
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form{
    padding: 20rpx;
    .input{
      display: inline-block;
      border: 1px solid #eeeeee;
      border-radius: 2rpx;
    }
  }
}
</style>
