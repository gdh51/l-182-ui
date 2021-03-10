import { isUndefined, isPromise } from '@/utils/type'

const noArgs = 0

// 统一处理关闭行为
export function beforeCloseWrapper(handler, type, modal) {
    const confirmClose = payload =>
        // 无论关闭还是确认，都会resolve，这样方便使用async函数的用户统一处理
        // 当modal的Promise被resolve后，弹窗会关闭
        modal._resolve({
            payload,
            type,
            modal,

            // 暴露一个更直接的参数表示行为
            isConfirm: type === 'confirm'
        })

    return function() {
        const pending = handler.bind(modal)(confirmClose, type, {
            instance: modal.instance,
            slotInstances: modal.slotInstances
        })

        // 用户定义的回调没有参数时，当其返回undefined时，我们认为它想关闭窗口
        if (handler.length === noArgs && isUndefined(pending)) {
            return confirmClose()
        }

        // 无论哪种情况，用户返回false，我们认为它不想关闭弹框
        if (pending === false) return

        // 返回Promise时，当Promise被resolve时，将其关闭
        if (isPromise(pending)) {
            pending.then(p => confirmClose(p))
        }
    }
}
