/*
 * @Author: Mr.Mao
 * @Date: 2021-04-08 11:32:18
 * @LastEditTime: 2021-05-07 14:34:20
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { getCurrentInstance, onBeforeUnmount } from '@vue/composition-api';
import { forIn } from 'lodash';
import {
  onLoad,
  onShow,
  onReady,
  onHide,
  onUnload,
  onPullDownRefresh,
  onReachBottom,
  onPageScroll,
  onShareAppMessage,
} from 'uni-composition-api';
const lifecycleStore: Record<string, any> = {};
/** 生命周期注入依赖 */
export const useLifecycleProvide = () => {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const currentInstance = getCurrentInstance() as any;

  // 获取当前路径信息
  const currentRoutePath: string =
    currentInstance?.proxy?.$route?.fullPath || page?.route;
  // 在HTML中, 字符串前面会多一个/
  let currentPath =
    currentRoutePath[0] === '/' ? currentRoutePath.slice(1) : currentRoutePath;
  currentPath = currentPath.split('?')[0];
  onLoad((option) => {
    uni.$emit(`${currentPath}-onLoad`, option);
    lifecycleStore[`${currentPath}-onLoad`] = option;
  });
  onShow(() => {
    uni.$emit(`${currentPath}-onShow`);
    lifecycleStore[`${currentPath}-onShow`] = 'xxxx';
  });
  onReady(() => uni.$emit(`${currentPath}-onReady`));
  onHide(() => uni.$emit(`${currentPath}-onHide`));
  onUnload(() => {
    uni.$emit(`${currentPath}-onUnload`);
    forIn(lifecycleStore, (k) => {
      delete lifecycleStore[k];
    });
  });
  onPullDownRefresh(() => uni.$emit(`${currentPath}-onPullDownRefresh`));
  onReachBottom(() => uni.$emit(`${currentPath}-onReachBottom`));
  onPageScroll((option) => uni.$emit(`${currentPath}-onPageScroll`, option));
  onShareAppMessage((option) => {
    uni.$emit(`${currentPath}-onShareAppMessage`, option);
    return {};
  });
};

/**
 * 生命周期接收依赖
 * @param lifecycles 生命周期配置
 */
export const useLifecycleInject = (
  lifecycles: {
    onLoad?: Parameters<typeof onLoad>[0];
    onShow?: Parameters<typeof onShow>[0];
    onReady?: Parameters<typeof onReady>[0];
    onHide?: Parameters<typeof onHide>[0];
    onUnload?: Parameters<typeof onUnload>[0];
    onPullDownRefresh?: Parameters<typeof onPullDownRefresh>[0];
    onReachBottom?: Parameters<typeof onReachBottom>[0];
    onPageScroll?: Parameters<typeof onPageScroll>[0];
    onShareAppMessage?: Parameters<typeof onShareAppMessage>[0];
  },
  option: { setup: boolean } = { setup: true }
) => {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  const currentInstance = getCurrentInstance() as any;
  const currentPath = page?.route || currentInstance?.proxy?.$route?.fullPath;
  Object.keys(lifecycles).forEach((key) => {
    type Key = keyof typeof lifecycles;
    const lifecycleItem = lifecycles[key as Key];
    const onPath = `${currentPath}-${key}`;
    uni.$on(onPath, (...args) => lifecycleItem?.(...args));
    if (lifecycleStore[onPath]) {
      uni.$emit(onPath, lifecycleStore[onPath]);
    }
  });
  const uninstall = () => {
    Object.keys(lifecycles).forEach((key) => {
      uni.$off(`${currentPath}-${key}`);
    });
  };
  if (option.setup) onBeforeUnmount(uninstall);
  return {
    uninstall,
  };
};
