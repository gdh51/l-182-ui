
import { parseLexer } from './parse'
import { optimize } from './optimize'
import { generate } from './generate'

export function compile (text) {
    let options = this.options;
    options.root = parseLexer(text || '');

    optimize(options.root);

    return generate(options);
}