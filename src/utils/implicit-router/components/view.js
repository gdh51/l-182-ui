import { getRouterByKey } from '../index'

export default {
    name: 'ImplicitRouterView',

    functional: true,

    props: {
        routerKey: {
            type: String,
            default: '182'
        }
    },

    render(_, {
        props, parent, data, children
    }) {

        // TODO组件缓存
        const h = parent.$createElement,
            { path, pathMap } = getRouterByKey(props.routerKey)

        return h(pathMap[path].component, data, children)
    },

    data() {
        return {}
    }
}

