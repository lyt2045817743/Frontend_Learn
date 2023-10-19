/**
 * 实现小型编译器：(add 10 (subtract 5 3))  ->   add(10, subtract(5, 3))
 */

// 编译器实现第一步：词法分析-将每一个词解析为一种类型的token
// 词法分析需要注意：切忌考虑代码本身的含义，只需要把其当做字符串、单词
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
    if (numRep.test(char)) { // 因为循环结束要push，因此必须在外面套一层if条件
      while (numRep.test(char)) {
        value += char; // 这里匹配的是字符0-9，因为输入就是字符串
        currentIndex++;
        char = input[currentIndex];
      }
      tokens.push({
        value,
        type: 'number'
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
        type: 'string'
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
        type: 'name'
      });
    currentIndex++;
    }
  }

  return tokens;
}

// 第一步中间产物
// [
//   { value: '(', type: 'paren' },
//   { value: 'add', type: 'name' },
//   { value: '10', type: 'number' },
//   { value: '(', type: 'paren' },
//   { value: 'subtract', type: 'name' },
//   { value: '5', type: 'number' },
//   { value: '3', type: 'number' },
//   { value: ')', type: 'paren' },
//   { value: ')', type: 'paren' }
// ]

// 编译器实现第二步：语法分析-将词法分析的结果转换为层级关系的表达（树：父子、兄弟）
// 语法分析需要注意：此时需要关注哪些是关键词、那些该关键词对应的参数（值/变量），因为要处理语义、进行分层了
const parser = (tokens) => {
  let currentIndex = 0;
  const ast = {
    type: 'Root',
    body: [],
  }

  function walk(tokens) {
    let token = tokens[currentIndex];
    if (token.type === 'number') {
      currentIndex++;
      console.log(token);
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    if (token.type === 'string') {
      currentIndex++;
      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++currentIndex];
      const node = {
        type: 'CallExpression',
        value: token.value,
        params: [],
      };
      token = tokens[++currentIndex];
      while (token.value !== ')') {
        node.params.push(walk(tokens));
        token = tokens[currentIndex];
        // currentIndex++; // 控制好index的值是避免bug出现的关键，每次退出walk函数前都对其递增，因此此步不需要再自增
      }
      currentIndex++;
      return node;
    }

    throw new TypeError('不存在这个类型');
  }

  while(currentIndex < tokens.length) {
    ast.body.push(walk(tokens));
  }

  return ast;
}

// 第二步中间产物
// {
//   "type": "Root",
//   "body": [
//      {
//         "type": "CallExpression",
//         "value": "add",
//         "params": [ // 每个数组都代表了同一层的所有节点
//            { // 每个对象表示该层的某一个节点
//               "type": "NumberLiteral",
//               "value": "10"
//            },
//            {
//               "type": "CallExpression",
//               "value": "subtract",
//               "params": [
//                  {
//                     "type": "NumberLiteral",
//                     "value": "5"
//                  },
//                  {
//                     "type": "NumberLiteral",
//                     "value": "3"
//                  }
//               ]
//            }
//         ]
//      }
//   ]
// }

module.exports = {
  tokenizer,
  parser,
}