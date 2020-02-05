// 匹配#标签，匹配到当前排的换行符之前 $1为# $2为匹配的文本
export const titleLevelRE = /^(\#{1,5})\s/,
    shortCodeRE = /^(`{1,2})/,

    // 匹配1~2个*，且它们后面不能跟空格否则无效
    asteriskRE = /^(\*{1,2})(?![\s\*])/,
    text = /^(.+?)(?![^`*(**)\n])/,
    newline = /^(\n+)/;

export const symbol2Tag = {
    '#': 'h1',
    '##': 'h2',
    '###': 'h3',
    '####': 'h4',
    '#####': 'h5',
    '`': 'code',
    '``': 'code',
    'p': 'p',
    '*': 'i',
    '**': 'b'
};

export const unarySymbol = ['#', '##', '###', '####', '#####'];
