/**
 * 实现小型编译器：(add 10 (subtract 5 3))  ->   add(10, subtract(5, 3))
 */

// 各阶段产物预览
//    *    第1步中间产物                             | 第2步中间产物                                                                  |    // 第3步中间产物
//    *    [                                       | {                                                                            |    {
//    *      { value: '(', type: 'paren' },        |  "type": "Program",                                                          |      "type": "Program",
//    *      { value: 'add', type: 'name' },       |   "body": [                                                                  |      "body": [
//    *      { value: '10', type: 'number' },      |      {                                                                       |       {
//    *      { value: '(', type: 'paren' },        |         "type": "CallExpression", // CallExpression为表达式, 即括号里面的内容    |         "type": "ExpressionStatement",
//    *      { value: 'subtract', type: 'name' },  |         "name": "add",                                                       |          "expression": {
//    *      { value: '5', type: 'number' },       |         "params": [ // 每个数组都代表了同1层的所有节点                            |            "type": "CallExpression",
//    *      { value: '3', type: 'number' },       |            { // 每个对象表示该层的1个节点                                        |            "callee": {
//    *      { value: ')', type: 'paren' },        |               "type": "NumberLiteral",                                       |               "type": "Identifier",
//    *      { value: ')', type: 'paren' }         |               "value": "10"                                                  |               "name": "add"
//    *    ]                                       |            },                                                                |            },
//    *                                            |             {                                                                |            "arguments": [
//    *                                            |                "type": "CallExpression",                                     |               {
//    *                                            |                "name": "subtract",                                           |                  "type": "NumberLiteral",
//    *                                            |                "params": [                                                   |                  "value": "10"
//    *                                            |                   {                                                          |               },
//    *                                            |                      "type": "NumberLiteral",                                |               {
//    *                                            |                      "value": "5"                                            |                  "type": "CallExpression",
//    *                                            |                   },                                                         |                  "callee": {
//    *                                            |                   {                                                          |                     "type": "Identifier",
//    *                                            |                      "type": "NumberLiteral",                                |                     "name": "subtract"
//    *                                            |                      "value": "3"                                            |                  },
//    *                                            |                   }                                                          |                  "arguments": [
//    *                                            |                ]                                                             |                     {
//    *                                            |             }                                                                |                        "type": "NumberLiteral",
//    *                                            |          ]                                                                   |                        "value": "5"
//    *                                            |       }                                                                      |                     },
//    *                                            |    ]                                                                         |                     {
//    *                                            |  }                                                                           |                        "type": "NumberLiteral",
//    *                                            |                                                                              |                        "value": "3"
//    *                                            |                                                                              |                     }
//    *                                            |                                                                              |                  ]
//    *                                            |                                                                              |               }
//    *                                            |                                                                              |            ]
//    *                                            |                                                                              |         }
//    *                                            |                                                                              |      }
//    *                                            |                                                                              |   ]
//    *                                            |                                                                              | }  


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

// 编译器实现第二步：语法分析-将词法分析的结果转换为层级关系的表达（树：父子、兄弟）
// 语法分析需要注意：此时需要关注哪些是关键词、那些该关键词对应的参数（值/变量），因为要处理语义、进行分层了
const parser = (tokens) => {
  let currentIndex = 0;
  const ast = {
    type: 'Program',
    body: [],
  }

  function walk(tokens) {
    let token = tokens[currentIndex];
    if (token.type === 'number') {
      currentIndex++;
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
        name: token.value,
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

// 编译器实现第三步：代码转换-将改语言的语法分析阶段产生的ast转换成另一种语言的ast的表达
// 代码转换需要注意：采用观察者模式
const traverser = (ast, visiter) => {
  const traverserArray = (nodes, parent) => {
    nodes.forEach((node) => {
      traverserNode(node, parent);
    })
  }

  const traverserNode = (node, parent) => {
    const methods = visiter[node.type];
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverserArray(node.body, node);
        break;
      case 'CallExpression':
        traverserArray(node.params, node);
        break;
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      default:
        break;
    }
  }
  traverserNode(ast, null);
}

const transformer = (ast) => {
  // 所有ast的基本结构都是type + body
  const newAst = {
    type: 'Program',
    body: [],
  }
  ast._context = newAst.body;
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value
        })
      }
    },
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value
        })
      }
    },
    CallExpression: {
      enter(node, parent) {
        let newNode = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        }
        node._context = newNode.arguments;

        if (parent.type !== 'CallExpression') {
          newNode = {
            type: 'ExpressionStatement',
            expression: newNode
          }
        }
        parent._context.push(newNode);
      }
    }
  })
  return newAst;
}

// 编译器实现第四步：代码生成-用我们前三步生成的新ast来生成代码
const codeGenerator = (node) => {
  switch(node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n'); // 用于生成多条语句
    case 'ExpressionStatement':
      return codeGenerator(node.expression) + ';';
    case 'CallExpression':
      return codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')';
    case 'Identifier':
      return node.name;
    case 'NumberLiteral':
      return node.value;
    case 'StringLiteral':
      return '"' + node.value + '"';
  }
}

module.exports = {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
}