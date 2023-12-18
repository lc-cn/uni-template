import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import App from './App.vue'

// 如此配置即可
import './config'
const pinia = createPinia()
pinia.use(persist)

export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia)
    return {
        app,
    }
}
