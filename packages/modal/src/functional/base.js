import Vue from 'vue'
import LModal from './src/modal'
import {
    isVnode, isArray, isObject
} from '@/utils/type'

const DEFAULT_OPTIONS = {
    title: '我是标题',
    closeByMask: true,
    once: true,
    header: true,
    footer: true,
    confirm: '确定',
    cancel: '取消',
    size: 'small',
    content: '我是内容',
    buttonReverse: false
}

Object.freeze(DEFAULT_OPTIONS)

export class Modal {
    constructor(options) {
        this._init(options)
        this.show()
    }

    _init(options) {
        this._initOptions(options)
        this._initState()
        this._initSlot(options)
        this._initInstance()
        this.show()
    }

    _initOptions(options) {
        this.$options = Object.freeze(options)
        this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    }

    _initState() {
        this.state = { visible: false }
        this.slots = {
            footer: null,
            content: null,
            header: null
        }
    }

    _initInstance() {

    }

    // 处理插槽内容
    _initSlot() {

        // footer和header仅支持false与VNode或组件
        const {
            footer, header, content
        } = this.options

        // 决定是否使用自定义插槽内容
        if (footer) {
            if (isVnode(footer)) {
                this.slots.footer = [ footer ]
            } else if (isArray(footer) && isVnode(footer[0])) {
                this.slots.footer = footer
            } else if (isObject(footer)) {
                Vue.extend(footer)
            }
        }
    }

    show() {

    }

    hide() {

    }
}
