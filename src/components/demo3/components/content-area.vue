<template>
    <div class="content_area"
         ref="ctx">
        <slot :class="ctxClass"
              :style="ctxStyle">Content Required</slot>
    </div>
</template>

<style lang="stylus" scoped>
.content_area
    width 100%
</style>

<script>
export default {
    name: 'ContentArae',

    props: ['ctxClass', 'ctxStyle'],

    data () {
        return {}
    }
}
</script>