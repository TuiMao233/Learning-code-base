/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-12-09 14:17:33
 * @LastEditTime: 2021-05-07 14:43:44
 * @Description: uniapp 选择器模块封装
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/**
 * 选择单个节点
 * @param selector 选择器
 * @param componentThis 组件this
 */
export const querySelector = (selector: string, componentThis?: any) => {
  const query = componentThis
    ? uni.createSelectorQuery().in(componentThis).select(selector)
    : uni.createSelectorQuery().select(selector);
  const promisify = <T>(nodesRef: any) => {
    return () => new Promise<T>((resolve) => nodesRef(resolve).exec());
  };
  const promisifyFields = <T>(nodesRef: any) => {
    return (fields: UniApp.NodeField) =>
      new Promise<T>((resolve) => nodesRef(fields, resolve).exec());
  };
  return {
    boundingClientRect: promisify<UniApp.NodeInfo>(query.boundingClientRect),
    context: promisify<UniApp.NodeInfo>(query.context),
    fields: promisifyFields<UniApp.NodeInfo>(query.fields),
    scrollOffset: promisify<UniApp.NodeInfo>(query.scrollOffset),
  };
};
/**
 * 选择多个节点
 * @param selector 选择器
 * @param componentThis 组件this
 */
export const querySelectorAll = (selector: string, componentThis?: any) => {
  const query = componentThis
    ? uni.createSelectorQuery().in(componentThis).selectAll(selector)
    : uni.createSelectorQuery().selectAll(selector);
  const promisify = <T>(nodesRef: any) => {
    return () => new Promise<T>((resolve) => nodesRef().exec(resolve));
  };
  const promisifyFields = <T>(nodesRef: any) => {
    return (fields: UniApp.NodeField) =>
      new Promise<T>((resolve) => nodesRef(fields).exec(resolve));
  };
  return {
    boundingClientRect: promisify<UniApp.NodeInfo[]>(query.boundingClientRect),
    context: promisify<UniApp.NodeInfo[]>(query.context),
    fields: promisifyFields<UniApp.NodeInfo[]>(query.fields),
    scrollOffset: promisify<UniApp.NodeInfo[]>(query.scrollOffset),
  };
};
// 如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
export const analyUnit = (unit: string | number) => {
  return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'rpx';
};
// 异步提示弹窗
export const showToast = (options: UniApp.ShowToastOptions) => {
  const duration = options.duration || 1500;
  uni.showToast({
    ...options,
    duration,
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};