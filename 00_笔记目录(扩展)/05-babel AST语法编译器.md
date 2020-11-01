---
title: babel AST语法编译器
date: 2020-11-01
categories:
  - 
tags: 
  - babel
---
## AST 的 CRUD 

### 1. Create 创建并生成

实际上，`Create`是个相对复杂的操作，通常会结合`Retrieve`和`Update`使用。可以结合实际需要，选择阅读顺序。

首先，构造一个空的`node`工程，后续会基于该项目一步步拓展。

```
npm install babylon @babel/types @babel/generator @babel/traverse
```

~~~js
import * as parser from "@babel/parser";
import generate from '@babel/generator';
// import traverse from "@babel/traverse";
// import * as t from "@babel/types";

const code = '';
// 根据源码字符串创建ast节点
const ast = parser.parse(code);
// 编译ast为源码字符串
const output = generate(ast);

console.log('Input \n', code);
console.log('Output \n', output.code);
~~~

#### 构造一个`1`的代码

根据上面的两个图，只有`1`代码由一个`ExpressionStatement`(语句节点)内嵌一个`Literal`组成。直接代码如下，可以参考下注释。

~~~js
import * as parser from "@babel/parser";
import generate from '@babel/generator';
// import traverse from "@babel/traverse";
import * as t from "@babel/types";

const code = '';
const ast = parser.parse(code);

// 生成数值节点
const literal = t.numericLiteral(123);
// 插入一个语句节点中
const exp = t.expressionStatement(literal);
// 将表达式放入body中
ast.program.body.push(exp);

// 编译ast为源码字符串
const output = generate(ast);

console.log('Input \n', code);
console.log('Output \n', output.code);
~~~

#### 构造`const a = 1`的代码

~~~js
import * as parser from "@babel/parser";
import generate from '@babel/generator';
// import traverse from "@babel/traverse";
import * as t from "@babel/types";

const code = '';
const ast = parser.parse(code);

// 生成标识节点
const id = t.identifier("a");
// 生成数值节点
const literal = t.numericLiteral(123);
// 生成赋值节点(a = 123)
const declarator = t.variableDeclarator(id, literal);

// 生成赋值语句节点, 传入赋值表示符, 赋值节点
const decaration = t.variableDeclaration("const", [declarator]);

ast.program.body.push(decaration);
// 编译ast为源码字符串
const output = generate(ast);

console.log('Input \n', code);
console.log('Output \n', output.code);
~~~

#### 创建一个简单的函数

~~~js
import * as parser from "@babel/parser";
import generate from '@babel/generator';
import * as t from "@babel/types";
// import traverse from "@babel/traverse";

const code = ``;
const ast = parser.parse(code);

// 生成标识节点(函数名称)
const id = t.identifier("add");
// 生成标识节点(参数名称)
const params = [
  t.identifier("a"),
  t.identifier("b"),
];
// 生成返回体节点
const returnBody = t.returnStatement(
  t.binaryExpression("+", params[0], params[1])
);
// 生成函数体节点
const functionBody = t.blockStatement([returnBody]);
// 生成函数体节点
const functionDeclaration = t.functionDeclaration(
  id,
  params,
  functionBody
);
// 插入语句
ast.program.body.push(functionDeclaration);
// 编译ast为源码字符串
const output = generate(ast);
console.log('Input \n', code);
console.log('Output \n', output.code);
~~~

### 2. Retrieve 代码查询

~~~js
import * as parser from "@babel/parser";
import generate from '@babel/generator';
import * as t from "@babel/types";
// import traverse from "@babel/traverse";

const code = `
export default {
  data() {
    return {
      message: 'hello vue',
      count: 0
    }
  },
  methods: {
    add() {
      ++this.count
    },
    minus() {
      --this.count
    }
  }
}
`;
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: [
    "typescript"
  ]
});
const dataProperty = (ast.program.body[0]as any).declaration.properties[0];
// 修改函数节点名称
dataProperty.key.name = "mydate";

const output = generate(ast, {}, code);
console.log(output.code);
~~~

#### 直接访问

如上图中，有很多节点`Node`，如需要获取`ExportDefaultDeclaration`下的`data`函数，直接访问的方式如下：

~~~js
const dataProperty = ast.program.body[0].declaration.properties[0]
console.log(dataProperty)
~~~

这种直接访问的方式可以用于固定程序结构下的节点访问，当然也可以使用**遍历**树的方式来访问每个`Node`。

这里插播一个`Update`操作，把`data`函数修改为`mydata`：

~~~js
const dataProperty = ast.program.body[0].declaration.properties[0]
dataProperty.key.name = 'mydata'
const output = generate(ast, {}, code)
console.log(output.code) // ...
~~~

#### 使用Traverse访问

 使用直接访问`Node`的方式，在简单场景下比较好用。可是对于一些复杂场景，存在以下几个问题：

1. 需要处理某一类型的`Node`，比如`ThisExpression`、`ArrowFunctionExpression`等，这时候我们可能需要多次遍历`AST`才能完成操作
2. 到达特定`Node`后，要访问他的`parent`、`sibling`时，不方便，但是这个也很常用

  `@babel/traverse`库可以很好的解决这一问题。`traverse`的基本用法如下：

~~~js
// 打印所有 node.type。 可以使用`path.type`，可以使用`path.node.type`
let space = 0;
traverse(ast, {
  // 进入时
  enter(path) {
    console.log(new Array(space).fill(' ').join(''), '>', path.type);
    space += 2;
  },
  // 退出时
  exit(path) {
    space -= 2;
    console.log(new Array(space).fill(' ').join(''), '>', path.type);
  }
});
~~~

#### 查询子节点

path中包含traverse方法，可遍历子节点

~~~js
traverse(ast, {
  VariableDeclaration(path) {
    path.traverse({
      Identifier(path) {
        // 更换所有类型为any
        path.get("typeAnnotation").replaceWith(
          t.typeAnnotation(t.anyTypeAnnotation())
        );
      },
    });
  }
});
~~~



### 3. Update 更新节点

使用几个常用的`NodePath``API`：`replace`、`insert`、`remove`。具体也可以看babel-handbook中的[Manipulation章节](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-manipulation)。

#### 将加法运算替换成乘法

~~~js
const code = `const c = a + b`;
const ast = parser.parse(code);
traverse(ast, {
  BinaryExpression(path) {
    if (path.node.operator === '+') {
      path.replaceWith(
        t.binaryExpression(
          "*",
          path.node.left,
          path.node.right
        )
      );
    }
  }
});
const outcode = generate(ast, {}, code);
console.log(outcode);
~~~

#### 单节点替换为多个节点

~~~js
const code = `this.count`;
const ast = parser.parse(code);
traverse(ast, {
  ReturnStatement(path) {
    path.replaceWithMultiple([
      t.expressionStatement(t.stringLiteral("hhh 没想到吧, 你的返回值被我替换掉啦")),
      t.expressionStatement(t.stringLiteral("你已经拿不到你的返回值啦, hhh气不气")),
      t.expressionStatement(t.stringLiteral("就问你气不气😁😁😁")),
    ]);
  }
});
const outcode = generate(ast, {}, code);
console.log(outcode);
~~~

#### `this.count`替换节点

~~~js
const code = `this.count`;
const ast = parser.parse(code);
traverse(ast, {
  MemberExpression(path) {
    if (
      t.isThisExpression(path.node.object) &&
      (path.node.property as any).name === "count"
    ) {
      // 查找object节点, 组成path
      path.get("object").replaceWith(t.memberExpression(
        t.thisExpression(),
        t.identifier("data")
      ));
    }
  }
});
const outcode = generate(ast, {}, code);
console.log(outcode);

~~~

#### 直接使用字符串替换

~~~js
const code = `this.count`;
const ast = parser.parse(code);
traverse(ast, {
  MemberExpression(path) {
    if (
      t.isThisExpression(path.node.object) &&
      (path.node.property as any).name === "count"
    ) {
      path.get("object").replaceWithSourceString("this.data");
    }
  }
});
const outcode = generate(ast, {}, code);
console.log(outcode);
~~~

#### 对象插入操作

~~~js

~~~



### 4. Remove 删除节点

