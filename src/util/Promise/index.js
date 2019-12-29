import { resolve } from './staticMethods/resolve/index'
import { reject } from './staticMethods/reject/index'

// 记录当前处理的最顶层promise，以便来确认那些promise是内部的
let activePromise = null;

// 测试用uuid，来追踪每个Promise实例
let uuid = 0;

export function Promise1(executor) {
    if (typeof executor !== 'function') throw new Error('???');

    this.state = PENDING;
    this.value = void 0;
    this.thenExecutor = null;
    this.uuid = uuid++;

    // 存储一个当前正在处理的promise，
    if (activePromise === null) {
        activePromise = this;

        // 如果里面包含另一个promise，则赋予其isInternal属性，来定位其在内部
    } else {
        this.isInternal = true;
    }

    // 执行promise的回调函数
    try {
        executor(resolve.bind(this), reject.bind(this));

        // 发生错误时直接reject掉
    } catch (e) {
        reject.call(this, e);
    }
}

// 作为Promise的resolve API，它有两个作用：
// 1. 作为构造函数API，创建一个新的已resolved的Promise
// 2. 作为每个Promise传入的实例方法，来调度promise任务
Promise1.resolve = resolve;
Promise1.reject = reject;

// 这里必须手动定义该函数，因为catch是保留字
Promise1.prototype.catch = function (onRejected) {
    return this.then((val) => {
        return val;
    }, onRejected);
};