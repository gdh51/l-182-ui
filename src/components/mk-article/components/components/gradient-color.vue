<template>
    <div class="gradient-bg"
        :class="[warpperClass, selected ? 'active' : '']">
        <slot></slot>
    </div>
</template>

<style lang="stylus" scoped>
gradientColor()
    border-radius 5px
    background-image linear-gradient(45deg, #feac5e, #c779d0, #4bc0c8, #feac5e, #c779d0, #4bc0c8)
    background-size 1000px
    animation gradientColor 3s linear infinite

@keyframes gradientColor {
    0 {
        background-position 0 0
    }

    100% {
        background-position 80% 0
    }
}

.gradient-bg
    cursor pointer

    &:hover
        gradientColor()

.active
    color #fff
    gradientColor()
</style>

<script>
export default {
    name: 'GradientColor',

    props: {
        warpperClass: {
            type: [Array, Object, String],
            default: ''
        },

        selected: {
            type: Boolean,
            dafault: false
        }
    },

    data () {
        return {}
    }
}
</script>