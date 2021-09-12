import Vue from 'vue'
import { resolvePath } from './resolve'

const KEY_ROUTER_MAP = new WeakMap(),
    ROUTER_KEY_MAP = new Map()

class Route {
    constructor({ routes = [], initPath = '/', key = Date.now() }) {
        this.routes = routes
        this.pathList = []
        this.pathMap = {}
        this.history = [initPath]
        this.index = 0
        this.init(initPath, key)
    }

    init(initPath, key) {
        Vue.util.defineReactive(this, 'path', initPath)
        this.creatRouteMap(this.routes)
        ROUTER_KEY_MAP.set(key, this)
        KEY_ROUTER_MAP.set(this, key)
    }

    creatRouteMap(routes) {
        routes.forEach(route => {
            this.addRouteRecord(route)
        })
    }

    addRouteRecord(route, parent) {
        const finalRoute = {
            parent: parent || null,
            path: resolvePath(route.path, parent && parent.path),
            component: route.component
        }
        this.pathList.push(finalRoute)
        this.pathMap[finalRoute.path] = finalRoute

        const children = route.children
        if (children) {
            children.forEach(child => this.addRouteRecord(child, finalRoute))
        }
    }

    push(path) {
        this.path = resolvePath(path, this.path)

        // 截断当前跳转位置之后的记录
        this.history = this.history.slice(0, this.index + 1)
        this.history.push(this.path)
        this.index++
    }

    replace(path) {
        this.path = resolvePath(path, this.path)

        this.history[this.index] = this.path
    }

    go(num) {
        this.index = this.index + num
        this.path = this.history[this.index]
    }

    back() {
        const targetPath = this.history[this.index - 1]
        if (targetPath) {
            this.path = targetPath
            this.index--
        }
    }

    forward() {
        const targetPath = this.history[this.index + 1]
        if (targetPath) {
            this.path = targetPath
            this.index++
        }
    }
}

function getRouterByKey(key) {
    return ROUTER_KEY_MAP.get(key)
}

function getKeyByRouter(route) {
    return KEY_ROUTER_MAP.get(route)
}

function useRoute(options = {}) {
    const { key } = options

    return getRouterByKey(key) || new Route(options)
}

export { useRoute, getRouterByKey, getKeyByRouter }
