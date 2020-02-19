// 处理浏览器跳转也面兼容性问题
function initScrollTo() {
    return function (y) {
        if (window.scrollTo) {
            return window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }

        window.scrollTop = y;
    };
}

let scrollToY = initScrollTo();


// 点击标题跳转到对应的元素
export function initScroll (orderToNodeMap) {

    return function scrollToOrder (heading) {
        scrollToY(scrollCachedFn(heading));
    };

    function scrollCachedFn (heading) {
        let node = orderToNodeMap[heading],
            hit = node.y;

        // 不忘更新被选中的状态
        node.selected = true;

        // 命中缓存，直接返回
        return hit || (node.y = gainElementRect(node.el).y);
    }
}

// 封装Rect Api
function gainElementRect(el) {
    return el.getBoundingClientRect();
}

export function initSelectedNode (NodesMap) {

    // 获取当前屏幕高度
    const ScrollY = window.scrollY;
    let currentNodeScrollY = 0,
        index = 0,
        currentNode;

    // 找到第一个出现屏幕上的元素，那么上一个元素则为当前目录处于的位置
    while (currentNodeScrollY < ScrollY) {
        currentNode = NodesMap[index];
        currentNodeScrollY = currentNode.y = gainElementRect(currentNode.el);
    }

    // 当为顶级标题时，返回顶级标题
    index = --index >= 0 ? index : 0;

    return {
        selectedNode: NodesMap[index],
        index
    };
}