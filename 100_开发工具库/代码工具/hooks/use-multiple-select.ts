/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-25 15:01:14
 * @LastEditTime: 2021-05-07 14:24:58
 * @Description: 多选列表逻辑
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { computed, ref, Ref, watch } from 'vue'
type Key = string | number
type MultipleSelectList = {
  id: Key
  count?: number
  select: boolean
  [key: string]: any
}[]
export const useMultipleSelect = (list: Ref<MultipleSelectList>) => {
  /** 当前是否为空 */
  const empty = computed(() => list.value.length === 0)
  /** 当前选中的项目列表 */
  const selectItems = computed(() => list.value.filter((item) => item.select))
  /** 当前是否为全选状态 */
  const isSelectAll = ref(false)
  /** 当前是否为全选状态(计算属性) */
  const selectAllComputed = computed(() => !list.value.find((item) => !item.select))
  /** 当前是否已经选择 */
  const isSelect = computed(() => !!list.value.find((item) => item.select))

  /** 处理所有项目全选/非全选 */
  const onHandleSelectsToggle = (selects: boolean) => {
    list.value.forEach((item) => {
      item.select = selects
    })
  }
  // 监视当前是否全选
  watch(selectAllComputed, () => {
    if (selectAllComputed.value !== isSelectAll.value) {
      isSelectAll.value = selectAllComputed.value
    }
  })
  // 监视选择状态
  watch(isSelectAll, () => {
    if (selectAllComputed.value !== isSelectAll.value) {
      onHandleSelectsToggle(isSelectAll.value)
    }
  })

  return {
    empty,
    selectItems,
    isSelect,
    isSelectAll,
  }
}
