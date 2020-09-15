import { timer } from '../utils/timer'
import { REJECTED } from '../utils/constants'
import { handleInnerInstance } from '../handleInnerInstance/index'
import { Promise1 } from '../../index'

/**
 * 作为Promise的reject API， 它有两个作用：
 * 1. 作为构造函数API， 创建一个新的已reject的Promise
 * 2. 作为每个Promise传入的实例方法， 来调度promise任务
 * @param {any} val 任意值
 */
Promise1.reject = function(val) {
    let instance = this

    // Promise初始化resolve后
    if (instance instanceof Promise1) {

        // ...调用回调
        return rejectInstance(val, instance)
    }

    // 构造函数Promise.reject API
    instance = new Promise1((resolve, reject) => {
        reject(val)
    })

    return instance
}

/**
 * 可以理解为真正的reject函数， 将Promise实例的状态转化为reject
 * @param {any} val reslove函数传入的值，可以为任意值
 * @param {Object} instance 当前被reject的Promise实例
 * 针对传入的val值，有两种情况：
 * 1. 非Promise实例，则直接开始调用下一个then()，并传入该值
 * 2. Promise实例，待该Promise实例状态改变后在调用then()方法，并传入该Promise的value
 */
function rejectInstance(val, instance) {
    timer(() => {
        let thenExecutor = null

        // reject了一个Promise实例时，要等到其传入的Promise状态改变，
        // 来trigger当前Promise实例的回调函数
        if (val instanceof Promise1) {

            // 将Promise最终的值用来继续启动当前promise的任务
            return val.then(
                handleInnerInstance.bind(null, instance, 'resolve'),
                handleInnerInstance.bind(null, instance, 'reject')
            )
        }

        thenExecutor = instance.thenExecutor
        instance.state = REJECTED
        instance.value = val

        // 这里只能return, 暂时无法判断Promise内部返回resolve一个promise的情况
        if (!thenExecutor) {

            // 如果是内部的未捕获的promise，则跳过
            if (instance.isInternal) {
                return
            }

            // (外部)最后一个promise状态为rejcet但未捕获时报错
            throw Error('Uncaught (???)  ' + instance.value)
        }

        // 有捕获函数时，我们就要新的promise resolve掉
        if (thenExecutor.onRejected) {
            let result = null

            try {
                result = thenExecutor.onRejected(instance.value)

                // 如果捕获函数出错，那么将错误冒泡到下一个promise
            } catch (e) {
                thenExecutor.reject(e)
            }

            // 返回promise实例时，在递归中处理
            if (result instanceof Promise1) {
                return result.then(
                    handleInnerInstance.bind(null, result, 'resolve'),
                    handleInnerInstance.bind(null, result, 'reject')
                )
            }

            thenExecutor.resolve(result)
        } else {

            // 没有设置catch类型的函数时，冒泡到下一个promise
            thenExecutor.reject(instance.value)
        }
    })
}
