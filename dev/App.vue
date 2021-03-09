<template>
    <div id="app">
        <l-input v-model="a" type="textarea" auto-size />
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    data() {
        return { a: '' }
    },
    mounted() {},
    methods: {
        adviceCb(_, cb) {
            cb(
                Array.from({ length: 10 }).map((_, i) => ({
                    label: '标题' + i,
                    value: `${i}`
                }))
            )
        }
    }
}
</script>

<style lang="stylus" scoped>
#app
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    background-color #515254 + 92%

    .box
        width 800px

    .container
        overflow scroll
        width 0

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover

.flip-list-move
    transition transform 1s
</style>
