const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn (obj, property) {
    return hasOwnProperty.call(obj, property);
}

export function isVNode(node) {
    return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

// 生成当前z-index层级关系
export const generateLevel = (function axisZCache() {

    // 存放一个基础z-index等级
    const state = [0];

    return function () {
        const curLevel = state[state.length - 1] + 1;
        state.push(curLevel);

        // 返回一个接口，里面包含当前应该生成的z-index值和销毁函数
        return {
            destroy,
            axisZ: curLevel
        };
    };

    function destroy() {
        state.pop();
    }
})();