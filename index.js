import App from './src/App'
import Vue from 'vue'
import Vuex from 'vuex'
import { registeComponents } from './packages/register-components'

Vue.use(Vuex)

// // 注册全局组件
registeComponents(Vue)

new Vue({ render: h => h(App) }).$mount('#app')
