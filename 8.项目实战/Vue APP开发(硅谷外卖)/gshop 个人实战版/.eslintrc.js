// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
	// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
	extends: ['plugin:vue/essential', 'airbnb-base'],
	// required to lint *.vue files
	plugins: [
		'vue'
	],
	// check if imports actually resolve
	settings: {
		'import/resolver': {
			webpack: {
				config: 'build/webpack.base.conf.js'
			}
		}
	},
	// add your custom rules here
	rules: {
		'eol-last': 'off', // 代码最后得有空格
		'no-trailing-spaces': 'off',	// 不允许有多余空格 
		'vue/Fvalid-template-root': 'off', // template 不能为空
		'no-tabs': 'off', // 不允许出现制表符(tab空格)
		'linebreak-style': 'off', // 不是期待的换行符
		'comma-dangle': ["error", "never"], // 数组/对象最后一项不能有逗号
		'func-call-spacing': 'off', // 函数调用间距
		'space-before-function-paren': 'off', // 函数括号前得有空格
		'handle-callback-err': 'off', // axios错误函数会显示语法错误
		'no-undef': 'off', // 不许有undef
		'no-unused-vars': 'off', // 禁止使用未使用的变量
		'indent': 'off', // 轨道缩进
		'semi': 'off', // 引入与调用方法缺少分号
		// don't require .vue extension when importing
		'import/newline-after-import':'off',
		'import/extensions': ['error', 'always', {
			js: 'never',
			vue: 'never'
		}],
		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		'no-param-reassign': ['error', {
			props: true,
			ignorePropertyModificationsFor: [
				'state', // for vuex state
				'acc', // for reduce accumulators
				'e' // for e.returnvalue
			]
		}],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': ['error', {
			optionalDependencies: ['test/unit/index.js']
		}],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
