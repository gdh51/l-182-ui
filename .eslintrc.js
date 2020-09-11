module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'prettier',
        'prettier/vue'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],

        // 数组头和尾前后空格1个
        'vue/array-bracket-spacing': ['error', 'always'],

        // 箭头函数的箭头前后保持空格
        'vue/arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],

        // {}语句块中头尾要有空格
        'vue/block-spacing': [2, 'always'],

        // 组件的命名形式按首字母大写的驼峰形式
        'vue/component-definition-name-casing': [2, 'PascalCase'],

        // 模版中的组件名称按连字符形式定义
        'vue/component-name-in-template-casing': [2, 'kebab-case'],

        // .vue文件中，板块的顺序

        'vue/component-tags-order': [
            'error',
            {
                order: ['template', 'script', 'style']
            }
        ],

        // 使用.操作符的右x值换行时，.跟随的右值
        'vue/dot-location': [2, 'property'],

        // 总是使用===
        'vue/eqeqeq': [2, 'always'],

        // 书写对象的，键名冒号后跟空格，前不跟
        'vue/key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true,
                mode: 'strict'
            }
        ],

        // 禁止v-slot旧语法
        'vue/no-deprecated-scope-attribute': [2],
        'vue/no-deprecated-slot-attribute': [2],
        'vue/no-deprecated-slot-scope-attribute': [2],

        // 禁用原生元素做组件名称
        'vue/no-reserved-component-names': [2],

        // 禁止除字符串、注释外，其他地方出现非法空格
        'vue/no-irregular-whitespace': [
            2,
            {
                skipStrings: true,
                skipComments: true
            }
        ],

        // 禁止在插值表达式语法中使用函数调用
        'vue/no-restricted-syntax': [2],

        // 代码块之间保持换行
        'vue/padding-line-between-blocks': ['error', 'always'],

        // .vue文件中的 script块的起始缩进
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 0,
                switchCase: 0,
                ignores: []
            }
        ],

        // 操作符前后要有空格
        'vue/space-infix-ops': [
            2,
            {
                int32Hint: false
            }
        ],

        // 一元操作符前后空格，+a这种不要, delete要
        'vue/space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ]
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ]
}
