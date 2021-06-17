/*
 * @Author: Mr.Mao
 * @Date: 2021-06-16 18:35:22
 * @LastEditTime: 2021-06-17 14:01:57
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { port: 3201, host: '0.0.0.0' }
})
