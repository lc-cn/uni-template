/// <reference types='@dcloudio/types' />
import 'vue'

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance;

  interface ComponentCustomOptions extends Hooks {

  }
  interface ComponentCustomProperties{
    $ossUrl:string
    $ossResource(filePath:string):string
  }
}
