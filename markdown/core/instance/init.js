import { Markdown } from '../../index'
import { initClass } from '../handle-class'

export function initMixin () {
    Markdown.prototype._init = function (options) {

        // h标签的class
        this.renderClass = options.renderClass = options.renderClass || {};

        options.mode = options.mode || 'dom';

        // 储存用户传入的配置
        this.$options = options;

        if (options.mode === 'vnode') {
            this.nodesTreeRoot = null;
            this.nodesTreeMap = [];
        }

        // 初始化缓存
        options.cached = {};

        // 初始化渲染的Class
        initClass(this.renderClass);
    }
}