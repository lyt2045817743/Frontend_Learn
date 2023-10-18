const { tokenizer } = require('./.');

const code = '(add 10 (subst 5 3))';

const tokens = tokenizer(code);

console.log(tokens);