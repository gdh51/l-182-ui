import { symbol2Tag, unarySymbol } from '../constants'

export class MarkAst {
    constructor(symbol, raw, text, closed) {

        // 符号的字符串表达式
        this.symbol = symbol;

        // 匹配的整个原文本字段
        this.raw = raw;

        // 文本内容，仅纯文本具有该属性
        if (text) {
            this.text = text;
        } else {
            // 符号对应的标签，文本内容不具有标签
            this.tag = symbol2Tag[symbol];
        }
        this.closed = closed || false;
        this.parent = null;
        this.children = [];
    }
}

export function isUnarySymbol(ast) {

    return ast && ast.symbol && unarySymbol.indexOf(ast.symbol) > -1;
}

export function isTextSymbol(ast) {
    return ast && (typeof ast.text === 'string');
}

export function createTextSymbol(text) {
    return new MarkAst('text', text, text, true);
}

const H_RE = /^(#{1,5})$/;

export function completeHInnerText (ast) {
    let children = ast.children;

    if (H_RE.test(ast.symbol)) {
        ast._innerText = collectInnerText(ast, '');
    }

    children.forEach(ast => {
        if (!isTextSymbol(ast)) {
            completeHInnerText(ast, '');
        }
    });

    function collectInnerText (ast, text) {
        let children = ast.children;

        text += children.map(ast => {
            if (isTextSymbol(ast)) {
                return ast.text;
            }
            return collectInnerText(ast, '');
        }).join('');

        return text;
    }
}
