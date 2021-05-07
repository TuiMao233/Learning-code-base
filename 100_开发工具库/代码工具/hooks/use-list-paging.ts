/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-25 15:01:14
 * @LastEditTime: 2021-05-07 14:32:22
 * @Description: 分页逻辑钩子
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { ref, Ref } from 'vue';
interface UseListPagingOpts<T extends any[]> {
  /** 加载下一页是否为重置列表 */
  nextReset?: boolean;
  /** 获取列表方法 */
  getList: (page: number) => T | Promise<T>;
  /** 列表内容 */
  list?: Ref<T>;
}
export const useListPaging = <T extends any[]>(opts: UseListPagingOpts<T>) => {
  const page = ref(1);
  const isEnd = ref(false);
  const list = opts.list || ref<T>([] as any);
  // 捕捉错误为空数组
  const tryGetList = async () => {
    try {
      return await opts.getList(page.value);
    } catch (error) {
      return [];
    }
  };
  // 重置列表
  const resetList = () => {
    page.value = 1;
    isEnd.value = false;
    tryGetList().then((res) => (list.value = res));
  };
  // 加载下一页
  const nextList = () => {
    if (isEnd.value) return false;
    page.value += 1;
    tryGetList().then((newList) => {
      if (!newList.length) {
        isEnd.value = true;
        return false;
      }
      if (opts.nextReset) {
        list.value = newList;
      } else {
        list.value = [...list.value, ...newList];
      }
    });
  };
  // 页面加载完毕时, 初始化重置列表
  // onLoad(() => resetList());
  // 用户上拉触底, 加载下一页
  // onReachBottom(() => nextList());
  return { list, page, isEnd, resetList, nextList };
};