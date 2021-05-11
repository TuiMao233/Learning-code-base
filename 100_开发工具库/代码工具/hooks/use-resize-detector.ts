import { onBeforeUnmount, reactive } from 'vue'

/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-26 16:47:11
 * @LastEditTime: 2021-03-01 10:30:13
 * @Description: 浏览器尺寸监听
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
export const useResizeDetector = () => {
  const size = reactive({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const onResize = () => {
    size.width = document.documentElement.clientWidth
    size.height = document.documentElement.clientHeight
  }
  window.addEventListener('resize', onResize)
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
  return size
}
