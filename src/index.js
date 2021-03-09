import App from '../dev/App.vue'
import Vue from 'vue'

import L182Ui from '../packages/register-components'
import E from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import F from 'vue-fullpage.js/src/index'

Vue.use(E)
Vue.use(F)
Vue.use(L182Ui)

new Vue({ render: h => h(App) }).$mount('#app')
