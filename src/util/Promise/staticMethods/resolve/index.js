import { timer } from '../../utils/timer'
import { RESOLVED } from '../../utils/constants'
import { releaseState } from '../../utils/activeQueue'
import { handleInnerInstance } from '../../handleInnerInstance/index'

/**
 * 作为Promise的resolve API，它有两个作用：
 * 1. 作为构造函数API， 创建一个新的已resolved的Promise
 * 2. 作为每个Promise传入的实例方法， 来调度promise任务
 * @param {any} val 任意值
 */
export function resolve(val) {
    let instance = this;

    // 这里我们通过this来确定上面提到的哪种用法
    if (instance instanceof Promise1) {

        // 异步启动promise任务
        return resolveInstance(val, instance);
    }

    // 作为构造函数Promise.resolve API来使用
    instance = new Promise1(resolve => {
        resolve(val);
    });

    return instance;
}

/**
 * 可以理解为真正的resolve函数，将Promise实例的状态转化为resolved
 * @param {any} val reslove函数传入的值，可以为任意值
 * @param {Object} instance 当前被resolve的Promise实例
 * 针对传入的val值，有两种情况：
 * 1. 非Promise实例，则直接开始调用下一个then()，并传入该值
 * 2. Promise实例，待该Promise实例状态改变后在调用then()方法，并传入该Promise的value
 */
function resolveInstance(val, instance) {

    // 通过异步来调度promise任务队列
    timer(() => {

        // 定义其后连接的then()方法中的回调函数对象
        let thenExecutor = null;

        // resolve了一个prmise时，
        // 要等到其传入的promise状态改变再调度then()中的任务
        if (val instanceof Promise1) {

            // 所以这里我们直接使用val.then()语句，在其状态改变后
            // 来调度外部的Promise实例的任务队列
            return val.then(handleInnerInstance.bind(null, instance, 'resolve'),
                handleInnerInstance.bind(null, instance, 'reject'));
        }

        // 这里只处理val非promise实例的情况的状态，
        // 因为当resolve一个Promise实例时，中途可能会因为其他错误导致reject
        thenExecutor = instance.thenExecutor;
        instance.state = RESOLVED;
        instance.value = val;

        // 如果当前的外部promise实例无then()处理，那么允许其安全退出。
        if (!thenExecutor) {

            // 内部promise实例，无权限清空activePromise，直接退出即可
            if (instance.isInternal) return;

            // 因为没有调用then()方法，所以这里要手动清空activePromise
            return releaseState();
        };

        // 改变下一个promise实例的状态
        try {

            // 对于promise回调函数返回的值，又分为两种情况
            // 1. 一种返回普通值
            // 2. 一种返回promise实例
            let result = thenExecutor.onRejected(instance.value);

            // 处理返回Promise实例的情况
            if (result instanceof Promise1) {
                return result.then(handlerInstance.bind(null, result, 'resolve'),
                    handlerInstance.bind(null, result, 'reject'));
            }

            thenExecutor.resolve(result);
        } catch (e) {
            thenExecutor.reject(e);
        }
    });
}