// import  from './scroll'
function initObserveScroll (threshhold, NodeState) {
    let lastScrollY = 0,
        firsetScrollY = nodesMap[0].y;
    window.addEventListener('scroll', scrollArticle);

    function scrollArticle() {
        const ScrollTop = window.scrollY,
            ;
    }
}

// 返回当前滚动的方向，1为向下，0为向上
function getScrollDirection (prev, cur) {
    return cur - prev > 0 ? 1 : 0;
}

// 计算当前滚动位置处于的目录项
function selecteWatchNode (originIndex, nodesMap, scrollTop, firsetScrollY) {
    let lastNodeY = nodesMap[originIndex].y,
        lastScrollY = nodesMap[nodesMap.length - 1],
        lastIndex = nodesMap.length;


    function computeClosestIndex() {
        let dir = getScrollDirection(lastNodeY, scrollTop),
            index;

        // 向上滚动
        if (!dir) {

            // 如果当前滚动位置处于之前节点上方近点位置
            if ((lastNodeY - firsetScrollY) / 2 < scrollTop) {
                index = originIndex;
                while (index) {

                }
            }  else {

                // 这里就是当前滚动位置处于第一个节点近点
                // 此时遍历的节点一定是全部获得了位置信息的
                index = 0;

                while (index <= originIndex) {
                    if (nodesMap[index].y > scrollTop) {
                        return --index;
                    }

                    index++;
                }
            }
        }

        // 向下滚动
        if (lastScrollY && (lastScrollY - lastNodeY) / 2 + lastNodeY < scrollTop) {

            // 当前滚动位置处于之前节点近点位置
            // 这里由于我们确定了最后个节点的位置信息已经获得，
            // 那么它前面的节点也肯定一定获得
            index = originIndex;

            while (index <= lastIndex) {
                if (nodesMap[index].y > scrollTop) {
                    return --index;
                }
                index++;
            }
        } else {

            // 当前节点处于最后节点附近
            index = lastIndex;

            while (index >= originIndex) {
                if (nodesMap[index].y > scrollTop) {
                    return --index;
                }
                index--;
            }
        }
    }
}



initObserveScroll();