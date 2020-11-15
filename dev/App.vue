<template>
    <div id="app">
        <l-modal>我是傻逼</l-modal>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    data() {
        return {}
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
