<template>
    <div id="app">
        <l-suspended-card style="width: 350px; height: 500px;">sdsd</l-suspended-card>
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

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
