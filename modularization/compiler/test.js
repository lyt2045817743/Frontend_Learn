const { tokenizer, parser, transformer, codeGenerator } = require('./.');

const code = '(add 10 (subtract 5 3))';

const tokens = tokenizer(code);
const oldAst = parser(tokens);
const newAst = transformer(oldAst);
const newCode = codeGenerator(newAst);

console.log(tokens);
console.log(JSON.stringify(oldAst));
console.log(JSON.stringify(newAst));
console.log(newCode);