<template>
    <div class="mask_type_two">
        <div class="mask-box_left">{{ title }}</div>
        <div class="mask-box_right">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'TypeTwo',

    props: {
        title: {
            type: String,
            default: 'Authør'
        },

        text: {
            type: String,
            default: 'Lazybønes'
        }
    }
}
</script>

<style lang="stylus" scoped>
.mask_type_two
    padding 5vw 0
    color #1b1b1b

    .mask-box_left
        display inline-block
        margin-right 1.6vw
        padding .8vw 1vw
        border-bottom 2px solid #1b1b1b
        font-weight 200
        font-size 3vw

    .mask-box_right
        position relative
        display inline-block
        padding .8vw 1.5vw
        border-top 2px solid #1b1b1b
        font-weight 700
        font-size 5vw

        &::before
            position absolute
            top -.3vw
            bottom .1vw
            left -1vw
            width 2px
            background-color #1b1b1b
            content ''
            transform rotateZ(15deg)
</style>

