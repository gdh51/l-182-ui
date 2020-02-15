import { initMarkdown } from './core/index'
import { compile } from './compiler/index'

export class Markdown {
    constructor(options = {}) {
        if (!(this instanceof Markdown)) {
            throw TypeError('use Constructor');
        }
        this._init(options);
    }

    compile (text) {
        const cached = this.$options.cached;

        if (cached[text]) {
            return cached[text];
        }

        return cached[text] = compile.call(this, text);
    }
}

// 初始化Markdown构造函数
initMarkdown();
