// 基础z-index数值
const baseAxisZ = 2000,
    onlyBase = 1,
    unFound = -1,
    AxisZState = [ baseAxisZ ]


// 返回一个安全的当前最高的z-index值
function zGenerate() {

    // eslint-disable-next-line
    const genAxisZ = AxisZState.slice(-1)[0] + 1

    AxisZState.push(genAxisZ)

    // 返回一个层级与销毁函数，便于直接销毁
    return {
        axisZ: genAxisZ,
        destroy: zDestroy.bind(null, genAxisZ)
    }
}

// 移除最高层级的遮罩，如果传入某个z-index值，则精准移除
function zDestroy(exact) {

    // 如果仅剩下基础层级那么直接返回
    if (AxisZState.length === onlyBase) return false
    if (exact) {
        const index = AxisZState.findIndex(z => z === exact)

        // eslint-disable-next-line
        return index !== unFound && AxisZState.splice(index, 1);
    }

    AxisZState.pop()
}

export {
    zDestroy,
    zGenerate
}
