const tokenizer = (input) => {
  const tokens = [];
  let currentIndex = 0;
  while(currentIndex < input.length) {
    let char = input[currentIndex];

    if (char === ' ') {
      currentIndex++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push({
        value: char,
        type: 'paren'
      })
      currentIndex++;
      continue;
    }

    const numRep = /[0-9]/;
    let value = '';
    if (numRep.test(char)) {
      while (numRep.test(char)) {
        value += char; // 这里匹配的是字符0-9，因为输入就是字符串
        currentIndex++;
        char = input[currentIndex];
      }
      tokens.push({
        value,
        type: 'NumberLiteral'
      });
      continue;
    }

    // 对于引号中间内容的处理：只有处理完这部分内容，才能区分出哪些是标识符内容
    if (char === '"') { // 实际情况中，还需要考虑单引号以及引号匹配问题
      value = '';
      char = input[++currentIndex];
      while(char !== '"') {
        value += char;
        char = input[++currentIndex];
      }
      tokens.push({
        value,
        type: 'StringLiteral'
      });
      currentIndex++;
      continue;
    }

    // 在引号内容判断后，即可判断标识符
    const strRep = /[a-z]/i;
    value = '';
    if (strRep.test(char)) {
      while(strRep.test(char)) {
        value += char;
        char = input[++currentIndex];
      }
      tokens.push({
        value,
        type: 'CallExpression'
      });
    currentIndex++;
    }
  }

  return tokens;
}

module.exports = {
  tokenizer,
}