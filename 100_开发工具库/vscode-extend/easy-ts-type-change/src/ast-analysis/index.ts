import * as parser from "@babel/parser";
import generate from '@babel/generator';
import * as t from "@babel/types";
import traverse from "@babel/traverse";
import { replaceType, calculSignature } from "../utils";
const code = `
const i1 = {
  a: 123
}
`;
const ast = parser.parse(code, {
  plugins: [
    'typescript'
  ]
});

traverse(ast, {
  // 遍历所有声明变量节点
  VariableDeclarator(path) {
    const value = (path.node.init as any)?.value;
    if (typeof value !== 'undefined') {
      replaceType(path, value);
    }
    path.traverse({
      ObjectExpression(topath) {
        topath.node.properties.forEach(objectProperty => {
          calculSignature(objectProperty);
        });
      }
    });
  },
});

const outcode = generate(ast, {}, code);
console.log(outcode);
