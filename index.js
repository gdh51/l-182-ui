import App from './src/App';
import Vue from 'vue';
import Vuex from 'vuex';
import {
    registeComponents
} from './src/common/register-components';
import { globalPlugin } from './src/common/global-plugin';
import state from './src/global-state/index';
import './node_modules/amfe-flexible/index.js';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(globalPlugin);

// 注册全局组件
registeComponents(Vue);

new Vue({
    render: h => h(App),
    store: new Vuex.Store(state)
}).$mount('#app');