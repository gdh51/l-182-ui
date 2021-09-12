import { getRouterByKey } from '../index'
import { mergeEvents } from '../../event'

export default {
    name: 'ImplicitRouterLink',

    functional: true,

    props: {
        // 绑定的隐式路由的key
        routerKey: {
            type: String,
            default: '182'
        },
        tag: {
            type: String,
            default: 'a'
        },
        path: {
            type: String,
            required: true
        },
        replace: {
            type: Boolean,
            required: false
        }
    },

    render(
        _,
        {
            props: { routerKey, tag, path, replace },
            children,
            parent,
            listeners
        }
    ) {
        const h = parent.$createElement

        return h(
            tag,
            {
                on: mergeEvents(
                    { click: guardEvent.bind(null, routerKey, path, replace) },
                    listeners
                )
            },
            children
        )
    }
}

function guardEvent(key, path, replace, e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return

    if (e.defaultPrevented) return

    if (e.button !== undefined && e.button !== 0) return
    if (e.preventDefault) {
        e.preventDefault()
    }

    const router = getRouterByKey(key)
    if (!router) return
    if (replace) {
        router.replace(path)
    } else {
        router.push(path)
    }
}
