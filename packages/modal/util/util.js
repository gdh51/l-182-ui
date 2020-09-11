import Vue from 'vue'
import Modal from '../modal.vue'
import Wrapper from '../../wrapper/wrapper.vue'
import { isVNode } from '../../../src/common/util/util'

export const config = {
    confirm: {
        cBtnExist: true
    },

    cancel: {
        cBtnExist: false
    }
}

// 调用弹窗的方法，支持传入组件或文本
export function $modal(VueComponent, options = {}) {
    // 第一个参数可以传入弹框的文本内容
    if (typeof VueComponent === 'string') {
        options.message = VueComponent

        // 第一个参数就为options时
    } else if (!isVNode(VueComponent)) {
        options = VueComponent
    }

    const w_mounted_el = document.createElement('div')
    const m_mounted_el = document.createElement('div')
    const ModalCtor = Vue.extend(Modal)
    const WrapperCtor = Vue.extend(Wrapper)
    const body = document.body

    body.appendChild(w_mounted_el)
    body.appendChild(m_mounted_el)

    const instanceW = new WrapperCtor().$mount(w_mounted_el)
    const instanceM = new ModalCtor({
        propsData: options
    }).$mount(m_mounted_el)

    if (options.callback) {
        instanceM.$once('confirm-callback', function () {
            options.callback()
            instanceW.$emit('destroy')
        })
    }

    instanceM.$once('cancel-callback', function () {
        instanceW.$emit('destroy')
    })

    if (isVNode(VueComponent) || isVNode(VueComponent.message)) {
        instanceM.$slots.default = [VueComponent]
    }

    Vue.nextTick(() => {
        instanceM.visible = true
    })
}
