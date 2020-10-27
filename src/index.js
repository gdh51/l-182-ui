import App from '../dev/App.vue'
import Vue from 'vue'
import { registerComponents } from '../packages/register-components'
import E from 'element-ui'

Vue.use(E)

// // 注册全局组件
registerComponents(Vue)

new Vue({ render: h => h(App) }).$mount('#app')
