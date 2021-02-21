<template>
    <div
        class="l-collapse-box"
        @mouseenter="showCollapseBox"
        @mouseleave="showCollapseBox"
    >
        <div class="l-collapse-box__default-area">
            <slot />
        </div>
        <transition name="jackInTheBox" mode="in-out">
            <div class="l-collapse-box__hover-area" v-show="isShowHover">
                <slot name="hover" />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'LCollapseBox',
    props: {
        animateName: {
            type: String,
            default: 'jackInTheBox',
            validator(v) {
                if (v === 'jackInTheBox') return true
                if (v === 'flipInY') return true
                return false
            }
        }
    },
    data() {
        return { isShowHover: false }
    },
    methods: {
        showCollapseBox() {
            this.isShowHover = !this.isShowHover
        }
    }
}
</script>

<style lang="stylus">
@import '~@theme/collapse-box.styl'
</style>
