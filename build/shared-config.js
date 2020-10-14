const { join } = require('path')



exports.alias = {
    '@': join(__dirname, '../src'),
    '@pack': join(__dirname, '../packages'),
    '@theme': join(__dirname, '../packages/theme/src')
}

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/

exports.vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
}
