import { TYPE_MAP } from '../utils/constants'

/**
 * 该函数为内部Promise的then()中的回调函数，用于处理promise resolve
 * 或返回另一个promise的情况。
 * 在该回调函数被调用时，我们将启动外部的Promise实例
 * @param {Object} instance 外部顶层的Promise实例(等待内部promise实例状态改变)
 * @param {String} type 当前改变状态的类型 resolve或reject
 * @param {any} value 内部Promise的返回值
 */
export function handleInnerInstance(
    instance,
    type,
    value
) {

    // 获取改变状态的类型
    type = TYPE_MAP[type]
    instance.state = type.status

    // 使外部promise.value继承内部promise实例最终结果的返回值
    instance.value = value

    let thenExecutor = instance.thenExecutor

    // 处理外部promise的then()中的回调，这里处理后面没有连接then()方法的情况
    if (!thenExecutor) {

        // 如果内部promise的状态为resolve，那么不做任何处理直接返回
        // 即，允许外部的Promise不连接then()
        if (instance.state === 'resolved' || instance.isInternal) {
            return
        }

        // 当内部的promise的状态为rejcet时，且外部promise未连接then()
        // 则提示未捕获报错
        throw new Error('Uncaught (???) ' + instance.value, 1, 1).name = 'last'
    };

    // 这里也要分情况处理
    if (type.type === 'resolve') {

        try {
            // 对于resolve的回调函数，只要其运行过程不发生错误，那么就直接resolve
            thenExecutor.resolve(thenExecutor[type.handler](instance.value))
        } catch (e) {

            // 回调函数运行过程中发生错误，则reject掉
            thenExecutor.reject(e)
        }
    }

    // catch类回调函数同理
    // 对于rejcet回调函数，要在其设置捕获错误的函数时
    // 处理任务成功后就resolve掉原结果。
    if (thenExecutor.onRejected) {
        thenExecutor.resolve(thenExecutor[type.handler](instance.value))
    } else {

        // 没有设置catch类型的函数时，冒泡到下一个promise
        thenExecutor.reject(instance.value)
    }
}
