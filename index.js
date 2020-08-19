import App from './src/App';
import Vue from 'vue';
import Vuex from 'vuex';
import {
    registeComponents
} from './packages/register-components';
// import { globalPlugin } from './src/common/global-plugin';
// import state from './src/global-state/index';
// import { initAxios } from './src/api/interceptor'
// import './node_modules/amfe-flexible/index.js';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.use(Vuex);
// Vue.use(globalPlugin);
// initAxios(Vue);

// // 注册全局组件
registeComponents(Vue);

new Vue({
    render: h => h(App)
}).$mount('#app');