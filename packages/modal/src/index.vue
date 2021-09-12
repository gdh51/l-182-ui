<template>
    <l-mask
        class="l-modal__container"
        @click="handleMaskClick"
        :visible="visible"
    >
        <l-card class="l-modal" :class="modalSizeClz" :style="modalStyle">
            <div class="l-modal__header" v-if="header">
                <slot name="header">
                    <span class="l-modal__title">{{ title }}</span>
                    <l-icon icon="close" @click="handleClick('cancel')" />
                </slot>
            </div>
            <slot>
                <div class="l-modal__content">{{ content }}</div>
            </slot>
            <div class="l-modal__footer" v-if="footer && buttonTypeEnum.length">
                <slot name="footer">
                    <div class="l-modal__footer_default">
                        <l-button
                            v-for="[ type, name ] in buttonTypeEnum"
                            @click="handleClick(type)"
                            :key="type"
                        >{{ name }}</l-button>
                    </div>
                </slot>
            </div>
        </l-card>
    </l-mask>
</template>

<script>
import LMask from '@pack/mask'
import LIcon from '@pack/icon'
import LButton from '@pack/button'
import { preDefinedProps } from './utils/pre-defined-props'

// 三秒的过渡时间
const TRANSITION_TIME = 300

export default {
    name: 'LModal',
    components: {
        LMask,
        LIcon,
        LButton
    },

    props: preDefinedProps,

    data() {
        return { visible: false }
    },

    computed: {
        modalSizeClz() {
            return 'l-modal_' + this.size
        },

        // 计算有用到几个按钮
        buttonTypeEnum() {
            const typeEnum = []
            this.cancel && typeEnum.push(['cancel', this.cancel])
            this.confirm && typeEnum.push(['confirm', this.confirm])
            this.buttonReverse && typeEnum.reverse()
            return typeEnum
        }
    },

    methods: {
        handleMaskClick() {
            this.handleClick('mask-click')
        },

        handleClick(type) {
            // 其他情况放出对应事件后关闭
            this.$emit(type, {
                hide: this.hide.bind(this),
                instance: this,
                type
            })
        },

        show() {
            this.visible = true

            // 保证在事件触发时，获取的数据是最新的数据
            this.$nextTick(() => this.$emit('show'))
        },

        hide() {
            this.visible = false
            this.$nextTick(() => this.$emit('hide', this.once))

            // 销毁实例，不可复用
            if (this.once) this.$nextTick(() => this.$destroy())
        }
    },

    destroyed() {
        // 预留动画时间
        setTimeout(() => this.$el.remove(), TRANSITION_TIME)
    }
}
</script>

<style lang="stylus">
@import '~@theme/modal'
</style>
