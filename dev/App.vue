<template>
    <div id="app">
        <!-- <div class="container">
            <div></div>
        </div> -->
        <l-scrollbar style="height: 100px;width: 200px;">
            <div style="height: 400px;width: 200px;background: red;" />
        </l-scrollbar>
        <div style="height: 100px;width: 200px;overflow: scroll;">
            <div style="height: 400px;width: 200px;background: blue;" />
        </div>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default { name: 'App' }
</script>

<style lang="stylus" scoped>
#app
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%

    .container
        width 0
        overflow scroll

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
