<template>
    <div id="app">
        <l-collapse-box>
            Blink
            <template v-slot:hover>182182182</template>
        </l-collapse-box>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    components: {},
    data() {
        return {}
    },
    methods: {}
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
</style>
