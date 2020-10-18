import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

// 替换赋值变量为类型节点(string, number, null, boolean)
export const replaceType = (path: NodePath<t.VariableDeclarator>, value: any) => {
  let typeAnnotation: t.FlowType = t.anyTypeAnnotation();
  if (typeof value === 'boolean') {
    typeAnnotation = t.booleanTypeAnnotation();
  }
  if (typeof value === 'number') {
    typeAnnotation = t.numberTypeAnnotation();
  }
  if (typeof value === 'string') {
    typeAnnotation = t.stringTypeAnnotation();
  }
  if (typeof value === 'object') {
    typeAnnotation = t.objectTypeAnnotation(
      value as (t.ObjectTypeProperty | t.ObjectTypeSpreadProperty)[]
    );
  }
  path.traverse({
    // 遍历所有标识节点, 并添加类型
    Identifier(path) {
      path.get("typeAnnotation").replaceWith(
        t.typeAnnotation(typeAnnotation)
      );
    },
  });
};

// 根据对象属性返回对象类型节点
export const calculSignature = (objectProperty: t.ObjectMethod | t.ObjectProperty | t.SpreadElement) => {
  console.log('key:', (objectProperty as any).key);
  console.log('value:', (objectProperty as any).value);
};