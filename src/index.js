import App from '../dev/App.vue'
import Vue from 'vue'
import { registerComponents } from '../packages/register-components'

// // 注册全局组件
registerComponents(Vue)

new Vue({ render: h => h(App) }).$mount('#app')
