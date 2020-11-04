import { componentTemplate, pagesTemplate } from "./options-template";

/*
 * @Author: 毛先生
 * @Date: 2020-08-04 11:06:25
 * @LastEditTime: 2020-08-15 13:49:12
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
interface CreateViewTemplateOptions {
  view_name: string,
  typescript?: boolean | unknown,
  style_type?: string | unknown,
  component?: boolean
}

export function createViewTemplate(options: CreateViewTemplateOptions) {
  const style_type = options?.style_type !== 'css' ? ` lang="${options.style_type}"` : '';
  const strike = options.view_name.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
  const view_name = strike.indexOf("-") === 0 ? strike.slice(1) : strike;

  if (options.component) {
    return `<template>
  <div class="${view_name}">${view_name}</div>
</template>

<script${options.typescript ? ' lang="ts"' : ''}>
import Vue from 'vue';
export default ${options.typescript ? 'Vue.extend(' : ''}{
  ${componentTemplate}
}${options.typescript ? ')' : ''};
</script>

<style${style_type}></style>
`;
  }

  if (!options.component) {
    return `<template>
  <div class="${view_name}">${view_name}</div>
</template>

<script${options.typescript ? ' lang="ts"' : ''}>
import Vue from 'vue';
export default ${options.typescript ? 'Vue.extend(' : ''}{
  ${pagesTemplate}
}${options.typescript ? ')' : ''};
</script>

<style${style_type}></style>
`;
  }
}
