import {defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
// 下面是AutoImport的配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
export default defineConfig((env)=>{
    return {
        plugins: [
            uni(),

            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                ],
                imports: [
                    'vue',
                    'uni-app',
                ],
                dts: 'types/auto-imports.d.ts',
            }),
            Components({
                dirs: ['src/components'],
                dts: 'components.d.ts',
                // 是否遍历子目录
                // deep: true,
            }),
        ]
    }
})
