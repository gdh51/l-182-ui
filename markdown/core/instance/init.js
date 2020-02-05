import { Markdown } from '../../index'
import { initClass } from '../handle-class'

export function initMixin () {
    Markdown.prototype._init = function (options) {
        // h标签的class
        this.renderClass = options.renderClass || {};

        // 储存用户传入的配置
        this.$options = options;

        // 初始化缓存
        this.$options.cached = {};

        // 初始化渲染的Class
        initClass(options);
    }
}