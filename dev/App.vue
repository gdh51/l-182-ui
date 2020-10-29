<template>
    <div id="app">
        <l-scrollbar wrapStyle="width: 100px;height:100px">
            <div style="width: 400px;"><div>sdsds</div><div>sdsds</div><div>sdsds</div><div>sdsds</div><div>sdsds</div><div>sdsds</div><div>sdsds</div></div>
        </l-scrollbar>
    </div>
</template>

<script>
import '../packages/theme/common-style.styl'

export default {
    name: 'App',
    data() {
        return { a: 0 }
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
