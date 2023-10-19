const { tokenizer, parser } = require('./.');

const code = '(add 10 (subtract 5 3))';

const tokens = tokenizer(code);
const oldAst = parser(tokens);

console.log(tokens);
console.log(JSON.stringify(oldAst));