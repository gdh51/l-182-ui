export function cached (fn) {
    const cached = Object.create(null),

        // 将存储结果
        cachedMap = [];

    return {
        cachedFn (str, ...arg) {
            let hit = cached[str];
            if (hit) {
                return hit;
            }
            hit = fn(str, ...arg);
            typeof hit === 'object' ? hit.name = str : void 0;
            cachedMap.push(hit);
            return cached[str] = hit;
        },

        // 访问map的接口
        accessCachedMap (index) {
            return cachedMap[index] || cachedMap;
        }
    };
}

function initScrollTo () {
    return window.scrollTo || function (options) {
        window.scrollTop = options.y;
    };
}

export let scrollToY = initScrollTo();