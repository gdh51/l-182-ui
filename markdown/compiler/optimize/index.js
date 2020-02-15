import { createTextSymbol, isTextSymbol } from '../../core/ast/index'

export function optimize(root) {

    // 主要目的是多个文本节点
    return normalizeArrayAst(root);
}

function normalizeArrayAst(ast) {
    let children = ast.children,
        last = null;

    // 无效优化直接返回
    if (children.length <= 1) return ast;

    for (let i = 0; i < children.length;) {

        // 递归优化子节点数组
        normalizeArrayAst(children[i]);

        // 合并相邻的文本节点
        if (isTextSymbol(children[i]) && isTextSymbol(last)) {

            // 创建一个新的文本节点代替两个分散的文本节点
            last = createTextSymbol(last.text + children[i].text);

            last.parent = ast;

            // 如果当前节点同前一个节点都为文本，则删除这两个节点，并用新的文本节点代替
            children.splice(i - 1, 2, last);

            // 这里直接跳过不用增加i，因为i恰好就为下一个节点
            // 注意for循环条件.length，会实时计算新值
            continue;
        }

        last = children[i];
        i++;
    }

    // 虽然没什么用，但是假装返回一下
    return ast;
}