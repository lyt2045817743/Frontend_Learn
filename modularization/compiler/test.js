const { tokenizer, parser, transformer } = require('./.');

const code = '(add 10 (subtract 5 3))';

const tokens = tokenizer(code);
const oldAst = parser(tokens);
const newAst = transformer(oldAst);

console.log(tokens);
console.log(JSON.stringify(oldAst));
console.log(JSON.stringify(newAst));