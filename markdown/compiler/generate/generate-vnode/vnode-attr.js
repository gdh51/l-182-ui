import {
    createTreeNode,
    isSameType,
    setParent
} from './tree-node';

const titleRE = /^(\#{1,5})$/;

export function handleEleAttr(tag, ast, stack) {
    const attr = {};
    let opts = stack.opts;

    // 处理class
    if (opts.renderClass[tag]) {
        attr.class = opts.renderClass[tag];
    }

    // 处理顶级标签，Vue中自动获取h标签对应的元素，除非用户主动关闭
    if (opts.relToH !== false && titleRE.test(ast.symbol)) {
        attr.ref = genHRef(stack, tag, ast);
    }

    return attr;
}

function genHRef(stack, tag, ast) {

    // 存储h1根节点
    if (tag === 'h1') {
        let rootNode = createTreeNode(tag, ast._innerText, '0');
        stack.nodesTreeRoot = rootNode
        stack.nodesTreeMap.push(rootNode);
        stack.prevNode = rootNode;
        return '0';
    }

    let refStack = stack.hRefs,
        ref = '',

        // 当前标签的等级，即h几
        target = Number(tag.substr(1)),

        // 仅生成到h2，即h1不生成
        origin = 2,
        node = null;

    // 每次进入时，增加当前h标签的计数
    refStack[tag] += 1;

    // 假如为h5，则生成1-1-1-1-
    while (target >= origin) {
        ref += `${refStack['h' + origin]}-`;
        origin++;
    }

    ref = ref.slice(0, -1);

    // 创建节点
    node = createTreeNode(tag, ast._innerText, ref);

    // 当回溯h标签等级时，清空下级的所有标签
    if (stack.prevHlevel > target) {
        resetHRefStack(refStack, target);

        // 因为此时不能定位其父节点，所以要重新查找
        setParent(node, redirectParentNode(node, stack));

        // 当设置下级标签时，例如之前为h2现在设置h3
    } else if (stack.prevHlevel < target) {
        setParent(node, stack.prevNode);

        // 当设置平级标签时，即之前设置h2现在仍然设置h2
    } else {
        setParent(node, stack.prevNode.parentNode);
    }

    // 处理完当前节点后更新上一个节点，并将其加入map中
    stack.nodesTreeMap.push(node);
    stack.prevNode = node;
    stack.prevHlevel = target;

    // 去掉末尾的-返回
    return ref;
}


// 重置指定 h + level标签以下的下级标签计数
function resetHRefStack(refStack, level) {
    let fullH = 5;
    if (!level) level = 2;

    // 只清空到当前h的等级
    while (level !== fullH) {
        refStack['h' + fullH] = 0;
        fullH--;
    }
}


function redirectParentNode(node, stack) {
    let nodesTreeMap = stack.nodesTreeMap,
        start = nodesTreeMap.length - 1;
    // 因为每创建一个节点会将节点加入nodesTreeMap中，
    // 所以此处我们想找到当前node的上一个同级节点即可
    // 它们一定有共同的父节点
    while (start) {
        if (isSameType(node, nodesTreeMap[start])) {
            return nodesTreeMap[start].parentNode;
        }
        start--;
    }

    // 当无法找到同级节点时返回h1节点
    return nodesTreeMap[0];
}