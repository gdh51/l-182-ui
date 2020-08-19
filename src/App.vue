<template>
    <div id="app">
        <l-button type="eva" plain>这是一个按钮</l-button>
    </div>
</template>

<style lang="stylus" scoped>
    #app
        display flex
        justify-content center
        align-items center
        width 100%
        height 100%

        .app_container
            width 80%
            height 500px
            padding-top 220px
            margin 0 auto
            background-size cover
</style>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App'
}
</script>