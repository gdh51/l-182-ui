<template>
    <l-mask>
        <div class="modal_box">
            <div class="modal_box-header global-padding">
                <div class="box_header-title">{{ title }}</div>
                <i class="box-close">X</i>
            </div>
            <custom-scrollbar
                :wrap-class="'modal_box-content'"
                :view-class="[ 'global-padding', 'modal_box-limit' ]"
            >
                <slot>
                    <div class="modal_slot-default">{{ message }}</div>
                </slot>
            </custom-scrollbar>
            <div class="modal_box-footer global-padding">
                <btn v-if="buttonType.cBtnExist" @action="_confirmAction" />
                <btn @action="_cancelAction" />
            </div>
        </div>
    </l-mask>
</template>

<script>
import CustomScrollbar from '../../../components/demo2/custom-scrollbar'
import { config } from './util/util'
import { generateLevel } from '../../util/util'

export default {
    name: 'Modal',

    props: {
        title: {
            type: String,
            default: '标题'
        },

        type: {
            type: String,
            default: 'cancel'
        },

        message: {
            type: String,
            default: '该弹框暂时未有内容'
        }
    },

    components: { CustomScrollbar },

    data() {
        return {
            visible: false,
            axis: { axisZ: 1 }
        }
    },

    computed: {
        buttonType() {
            return config[this.type] || config.cancel
        }
    },

    created() {
        this.axis = generateLevel()
    },

    methods: {
        _cancelAction() {
            this.$emit('cancel-callback')
            this._destroy()
        },

        _confirmAction() {
            this.$emit('confirm-callback')
            this._destroy()
        },

        $hide() {
            this.visible = false
        },

        $show() {
            this.visible = true
        },

        _destroy() {
            const vm = this
            vm.axis.destroy()
            vm.$hide()
            vm.$nextTick(() => {
                vm.$destroy()
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.modal_wrapper
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    text-align center

    &::after
        display inline-block
        height 100%
        content ''
        vertical-align middle

    .modal_box
        display inline-block
        overflow hidden
        width 420px
        border 1px solid $lgy
        border-radius 4px
        background-color $lw1
        box-shadow $shadow
        vertical-align middle
        backface-visibility hidden

        .modal_box-header
            position relative

            .box_header-title
                color $lo3
                text-align left
                font-size 18px

            .box-close
                position absolute
                top 10px
                right 15px
                color $lo1
                font-style normal

        .modal_box-content
            max-height 223px

            >>>.modal_box-limit
                min-height 80px

        .modal_slot-default
            color $dg1
            line-height 60px

        .modal_box-footer
            text-align right

            button:nth-child(2)
                margin-left 10px
</style>
