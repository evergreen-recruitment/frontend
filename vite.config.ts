// @ts-nocheck
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import vsharp from 'vite-plugin-vsharp'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      eslintPlugin(),
      // 图片压缩
      vsharp(),
      // 代码gzip压缩
      viteCompression({
        verbose: true, // 控制台输出压缩结果
        disable: true, // 禁用
        threshold: 10240, // 文件大小大于这个值时启用压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 压缩后缀
        deleteOriginFile: false, // 是否删除原文件
        // deleteOriginFile: true, // 是否删除原文件
        compressionOptions: {
          // 压缩级别
          level: 5,
        },
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            // 自动导入组件
            importStyle: false,
          }),
        ],
      }),
    ],
    css: {
      postcss: {
        plugins: [postcssPresetEnv()],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // 为 @ 设置别名
      },
    },
    server: {
      // 指定dev sever的端口号，默认为5173
      port: env.VITE_APP_PORT,
      // 自动打开浏览器运行以下页面
      // open: '/',
      // 设置反向代理
      proxy: {
        // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
        // 例如: http://localhost:3000/api/login -> http://localhost/api/login
        // 如果反向代理到localhost报错Error: connect ECONNREFUSED ::1:80，
        // 则将localhost改127.0.0.1
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      // 移除console和debugger
      drop: ['console', 'debugger'],
    },
  }
})
