import App from './src/App'
import Vue from 'vue'
import { registeComponents } from './packages/register-components'

// // 注册全局组件
registeComponents(Vue)

new Vue({ render: h => h(App) }).$mount('#app')
