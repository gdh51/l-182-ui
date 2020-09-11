<template>
    <div class="wrapper-box">
        <div class="circle_box" :class="innerClass">
            <slot></slot>
        </div>
    </div>
</template>

<script>
/**
 * 圆形容器，可以选择一个插槽内容，默认情况下原型在容器中贴边，如需自定义位置，
 * 可以传入class来覆盖
 */
export default {
    name: 'CircleBox',

    props: ['innerClass']
}
</script>

<style lang="stylus" scoped>
.wrapper-box
    width 1.2rem
    height 1.2rem

    .circle_box
        width 100%
        height 100%
        border-radius 50%
</style>

