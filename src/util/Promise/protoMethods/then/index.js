import { releaseState } from '../../utils/activeQueue'

/**
 * 用于处理Promise实例的后续结果
 * @param {Function} onFulfilled 处理resolve的回调函数
 * @param {Function} onRejected 处理reject的回调函数
 * 有两种启动方式，但都是根据上一个Promise的状态：
 * 1. 通过上一个Promise自动调用改变状态的函数来调动
 * 2. 对于已改变状态的Promise，则需要根据其状态手动启动挂载在then上的回调函数
 */
export function then (onFulfilled, onRejected) {

    // 即调用该then方法的上一个Promise实例
    const prevInstance = this;

    // 仅在顶层Promise更新activePromise
    if (!prevInstance.isInternal) {
        releaseState();
    }

    // 完成状态的promise再次连接then时，需要我们手动启动任务
    if (prevInstance.state === RESOLVED) {
        return new Promise1(resolve => {
            resolve(onFulfilled(prevInstance.value));
        });
    } else if (prevInstance.state === REJECTED) {
        return new Promise1((resolve, reject) => {

            // 这里不一定有onRejected函数，所以我们要做判断
            if (onRejected) {

                // 如果注册了onRejected函数，那么成功处理后，我们将
                // resolve当前的Promise实例
                try {
                    resolve(onRejected(prevInstance.value));
                } catch (e) {
                    reject(e);
                }
            } else {

                // 若没有注册catch类型函数，那么我们让它冒泡到下一个promise
                reject(prevInstance.value);
            }
        });
    }

    // 对于pengding状态的promise实例，我们将then上的promise实例方法传递给它
    // 方便调用then的promise实例操作
    const next = new Promise1((resolve, reject) => {

        // 此时该promise已执行，进入了pending状态
        prevInstance.thenExecutor = {
            onFulfilled,
            onRejected,
            resolve,
            reject
        };
    });

    return next;
}