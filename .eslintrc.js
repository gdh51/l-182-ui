const BasicIndent = 4,
    ObjectCurlyNewline = {
        multiline: true,
        minProperties: 3,
        consistent: true
    }

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },

    plugins: [ 'vue' ],

    // 推荐规则，优先级从下到上
    extends: [
    // eslint推荐规则
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        'linebreak-style': [ 'error', 'unix' ],
        quotes: [ 'error', 'single', {
            allowTemplateLiterals: true,
            avoidEscape: true
        } ],
        semi: [ 'error', 'never', {
            beforeStatementContinuationChars: 'any'
        } ],

        indent: [ 'error', BasicIndent, {

            // switch语句的缩进
            SwitchCase: 1,

            // 多个变量声明换行后的缩进
            VariableDeclarator: 1,

            // IIFE函数中的代码块初始缩进
            outerIIFEBody: 1,

            // 链式调用缩进
            MemberExpression: 1,

            // 函数声明的形参与函数体的缩进
            FunctionDeclaration: {
                body: 1,
                parameters: 1
            },

            // 函数表达式同样的
            FunctionExpression: {
                body: 1,
                parameters: 1
            },

            // 函数调用同理
            CallExpression: {
                arguments: 1
            },

            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,

            // 三元表达式记得缩进
            flatTernaryExpressions: false,
            offsetTernaryExpressions: true
        } ],

        // 对标prettier trailingCommas，最后一个字段或元素是否带,号
        'comma-dangle': [ 1, 'never' ],

        // 禁止if语句中return后，else/else if继续return
        'no-else-return': [
            'warn',
            {
                allowElseIf: true
            }
        ],

        // 禁止意义不明的数字
        'no-magic-numbers': [
            'error',
            {
                // 忽略数组下标
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false
            }
        ],

        // 注释前空一行
        'lines-around-comment': [
            2,
            {
                beforeBlockComment: true
            }
        ],

        // 文件末尾必须要空一行
        'eol-last': [ 'error', 'always' ],

        // 逗号后面留空格(定义数组或对象)
        'comma-spacing': [ 'warn', {
            before: false,
            after: true
        } ],


        // 该选项与prettier冲突，请勿选择
        'array-bracket-spacing': [ 'error', 'always' ],

        // 对象的动态键名前后保持空格(Class)中除外
        'computed-property-spacing': ['warn', 'never', {
            enforceForClassMembers: false
        } ],

        // 注释位置
        'line-comment-position': [ 'warn', {
            position: 'above'
        } ],

        // 定义class的字段完后，下一个字段前要换行
        'lines-between-class-members': [ 'warn', 'always' ],

        // 一行的最大长度
        'max-len': [ 'warn', {
            code: 80,
            tabWidth: 4,
            comments: 70,

            ignoreTrailingComments: true,

            ignoreUrls: true,

            ignoreStrings: true,

            ignoreTemplateLiterals: true,

            ignoreRegExpLiterals: true
        } ],

        // 函数定义的参数，最多5个，多了应该考虑对象了
        'max-params': [ 'warn', 5 ],

        // 链式调用换行，超过3个调用就应该换行了
        'newline-per-chained-call': [ 'warn', {
            ignoreChainWithDepth: 3

        } ],

        'no-lonely-if': 'warn',

        'no-mixed-spaces-and-tabs': 'error',

        'no-trailing-spaces': 'warn',

        'no-whitespace-before-property': 'error',

        // if类似的这种语句不加{}时，下一个语句的位置在后面，而不是换行
        'nonblock-statement-body-position': 'error',

        // 对象字面量超过3个字段时换行
        'object-curly-newline': [ 'warn', {
            ObjectExpression: ObjectCurlyNewline,
            ObjectPattern: ObjectCurlyNewline,
            ImportDeclaration: ObjectCurlyNewline,
            ExportDeclaration: ObjectCurlyNewline
        } ],

        // 对标prettierbracketSpacing，对象{}前后要有空格
        'object-curly-spacing': [ 'warn', 'always', {
            arraysInObjects: true,
            objectsInObjects: true
        } ],

        // 同一作用域中的同类型声明只能写一次
        'one-var': [ 'error', 'consecutive' ],

        // 对标prettier quoteProps，对象字段命名只在需要加引号时加引号
        'quote-props': [ 'error', 'as-needed' ],

        'space-before-blocks': [ 'error', 'always' ],

        'space-before-function-paren': [ 'error', 'never' ],

        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],

        'space-infix-ops': [
            2,
            {
                int32Hint: false
            }
        ],

        'switch-colon-spacing': 'error',

        // 对标prettier arrowParens，箭头函数不需要(参数)时就不加
        'arrow-parens': [ 'error', 'as-needed' ],

        // template中数组头和尾前后空格1个
        'vue/array-bracket-spacing': [ 'error', 'always' ],

        // 箭头函数的箭头前后保持空格
        'vue/arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],

        // {}语句块中头尾要有空格
        'vue/block-spacing': [ 2, 'always' ],

        // 组件的命名形式按首字母大写的驼峰形式
        'vue/component-definition-name-casing': [ 2, 'PascalCase' ],

        // 模版中的组件名称按连字符形式定义
        'vue/component-name-in-template-casing': [ 2, 'kebab-case' ],

        // .vue文件中，板块的顺序

        'vue/component-tags-order': [
            'error',
            {
                order: [ 'template', 'script', 'style' ]
            }
        ],

        // 使用.操作符的右x值换行时，.跟随的右值
        'vue/dot-location': [ 2, 'property' ],

        // 总是使用===
        'vue/eqeqeq': [ 2, 'always' ],

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
        'vue/no-deprecated-scope-attribute': [ 2 ],
        'vue/no-deprecated-slot-attribute': [ 2 ],
        'vue/no-deprecated-slot-scope-attribute': [ 2 ],

        // 禁用原生元素做组件名称
        'vue/no-reserved-component-names': [ 2 ],

        // 禁止除字符串、注释外，其他地方出现非法空格
        'vue/no-irregular-whitespace': [
            2,
            {
                skipStrings: true,
                skipComments: true
            }
        ],

        // 禁止在插值表达式语法中使用函数调用
        'vue/no-restricted-syntax': [ 2 ],

        // 代码块之间保持换行
        'vue/padding-line-between-blocks': [ 'error', 'always' ],

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
            files: [ '*.vue' ],
            rules: {
                indent: 'off'
            }
        }
    ]
}
