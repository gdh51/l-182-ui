import { isTextSymbol } from '../core/mark-ast'
import { symbol2Tag } from '../core/constants'
import { addClass } from '../core/handle-class'

export function generate(options = {}) {
    let result = null;

    result = generateDocFragment(options);

    if (options.mode === 'text') {
        result = generateInnerHTML(result);
    }

    return result;
}

function generateDocFragment(options) {
    let frame = document.createDocumentFragment(),
        rootEle = document.createElement('article');

    frame.appendChild(rootEle);

    transform2Node(options.root, rootEle, options.renderClass);

    return frame;
}

function transform2Node(ast, parent, renderClass) {
    let children = ast.children;

    for (let i = 0; i < children.length; i++) {
        let curAst = children[i],
            tag = '',
            node = null;

        // 处理文本节点
        if (isTextSymbol(curAst)) {
            node = document.createTextNode(curAst.text);

            // 普通元素节点
        } else {
            tag = symbol2Tag[curAst.symbol];
            node = document.createElement(tag);

            // 如果用户定义各元素的类，那么为元素添加类
            renderClass[tag] && addClass(node, renderClass[tag]);
        }

        parent.appendChild(node);

        transform2Node(curAst, node, renderClass);
    }
}

function generateInnerHTML (doc) {
    return doc.firstElementChild.outerHTML;
}