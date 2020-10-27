<template>
    <div id="app">
        <el-scrollbar
            viewStyle="height: 100px; width: 200px;"
            wrapStyle="height: 100px; width: 200px;"
        >
            <div style="height: 400px;width: 200px;background: blue;">sdsds</div>
        </el-scrollbar>
        <!-- <div style="width: 200px;height: 100px;">
            <div>
                <div style="overflow: auto;height: 100px;margin-left: -16px;">
                    <div
                        style="height: 400px;width: 200px;background: blue;"
                    >sdsds</div>
                </div>
            </div>
        </div>-->
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
        overflow scroll
        width 0

    .app_container
        margin 0 auto
        padding-top 220px
        width 80%
        height 500px
        background-size cover
</style>
