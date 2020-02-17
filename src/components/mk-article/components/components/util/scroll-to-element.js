import { cached, scrollToY } from './util';

// 存储跳转过的元素信息
export function initScrollState () {
    let cachedApi = cached(gainElementInfo).
        scrollCachedFn = cachedApi.cachedFn;

    return function (heading, el) {
        scrollToY({
            top: scrollCachedFn(heading, el).y,
            behavior: 'smooth'
        });
    };
}

function gainElementInfo(heading, el) {
    return el.getBoundingClientRect();
}
