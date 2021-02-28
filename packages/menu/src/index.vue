<template>
    <div class="l-menu" :class="`l-menu_${justify}`">
        <slot />
    </div>
</template>

<script>
const JUSTIFY_MAP = new Map().set('right', 1).set('left', 1).set('center', 1)
export default {
    name: 'LMenu',

    props: {
        justify: {
            type: String,
            default: 'right',
            validator(v) {
                return JUSTIFY_MAP.has(v)
            }
        }
    },
    created() {
        this.$on('menu-click', path => this.$emit('path-change', path))
    }
}
</script>

<style lang="stylus">
@import '~@theme/menu.styl'
</style>
