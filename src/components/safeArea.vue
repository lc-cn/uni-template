<script lang="ts" setup>
import { Dict } from "src/types";

const menuButtonRect=uni.getMenuButtonBoundingClientRect()
const windowWidth=uni.getSystemInfoSync().windowWidth
const safeTop=menuButtonRect.top
const safeBottom=menuButtonRect.bottom
const menuWidth=menuButtonRect.width
const menuHeight=menuButtonRect.height
const menuRight=windowWidth-menuButtonRect.right
const props=defineProps<{
  withMenu?:boolean,
  withBottom?:boolean,
  classes?:string|Dict<string>|string[],
  back?:string|boolean,
  title?:string,
  color?:string
}>()
const handleBack=()=>{
  if(typeof props.back==='string') uni.navigateTo({
    url:props.back,
    fail(){
      uni.switchTab({
        url:props.back as string
      })
    }
  })
  else uni.navigateBack()
}
</script>

<template>
  <view class="safe-area-wrap">
    <view class="safe-area-top" :style="`--top:${safeTop}px;background:${color};`">
      <view class="top-container" :style="`--width:${menuWidth}px;--height:${menuHeight}px;--right:${menuRight}px`" v-if="withMenu">
        <slot name="back">
          <view class="back" v-if="back" @click="handleBack">返回</view>
        </slot>
        <view class="title">{{title}}</view>
        <view class="placeholder"/>
      </view>
    </view>
    <view class="safe-area" :class="classes">
      <slot/>
    </view>
    <view v-if="withBottom" class="safe-area-bottom" :style="`--bottom:${safeBottom}px`"/>
  </view>
</template>

<style lang="scss">
.safe-area-wrap{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .safe-area-top{
    padding-top: var(--top);
    .top-container{
      position: relative;
      width: 100%;
      height: var(--height);
      display: flex;
      align-items: center;
      justify-content: center;
      .back{
        position: relative;
        left: 2rpx;
      }
      .title{
        text-align: center;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        flex: 1 0 auto;
      }
      .placeholder{
        position: absolute;
        right: 0;
        backdrop-filter: blur(9999rpx);
        width: calc(var(--width) + var(--right));
        border-radius: calc(var(--height) / 2) 0 0 calc(var(--height) / 2);
        height: 100%;
      }
    }
  }
  .safe-area{
    flex: 1 0 auto;
  }
  .safe-area-bottom{
    padding-bottom: var(--bottom);
  }
}
</style>
