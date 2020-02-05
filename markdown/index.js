import { complie } from './compiler/index'

class Markdown {
    constructor(options = {}) {
        if (!(this instanceof Markdown)) {
            throw TypeError('use Constructor');
        }
        this._init(options);
    }

    complie (text) {
        return complie.call(this ,text);
    }
}
