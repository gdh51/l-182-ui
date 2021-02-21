<template>
    <div class="l-menu" :class="`l-menu_${justify}`">
        <slot />
    </div>
</template>

<script>
import { useRoute } from '@/utils/implicit-router'

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
        },
        routeKey: {
            type: String,
            default: '182'
        }
    },
    data() {
        return { router: null }
    },
    mounted() {
        this.router = useRoute({
            key: this.routeKey,
            routes: this.$children.map(({ path }) => ({ path }))
        })

        this.$on('menu-click', v => this.router.push(v))
    }
}
</script>

<style lang="stylus">
@import '~@theme/menu.styl'
</style>
