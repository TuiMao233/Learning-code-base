"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewTemplate = void 0;
const options_template_1 = require("./options-template");
function createViewTemplate(options) {
    const style_type = (options === null || options === void 0 ? void 0 : options.style_type) !== 'css' ? ` lang="${options.style_type}"` : '';
    const strike = options.view_name.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
    const view_name = strike.indexOf("-") === 0 ? strike.slice(1) : strike;
    if (options.component) {
        return `<template>
  <div class="${view_name}">${view_name}</div>
</template>

<script${options.typescript ? ' lang="ts"' : ''}>
import Vue from 'vue';
export default ${options.typescript ? 'Vue.extend(' : ''}{
  ${options_template_1.componentTemplate}
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
  ${options_template_1.pagesTemplate}
}${options.typescript ? ')' : ''};
</script>

<style${style_type}></style>
`;
    }
}
exports.createViewTemplate = createViewTemplate;
//# sourceMappingURL=index.js.map