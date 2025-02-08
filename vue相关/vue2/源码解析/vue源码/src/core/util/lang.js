/* @flow */

/**
 * 用于解析HTML标签、组件名和属性路径的Unicode字母。
 * 参考：https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * 跳过 \u10000-\uEFFFF，因为它会导致PhantomJS卡死
 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

/**
 * 检查字符串是否以 $ 或 _ 开头
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)  // 获取字符串的第一个字符的字符编码
  return c === 0x24 || c === 0x5F  // 如果字符是 $ 或 _，返回 true
}

/**
 * 定义一个属性。
 *
 * value：属性的值，这里是传递给 val 的值。
 * enumerable：布尔值，表示属性是否可以通过 for...in 循环被枚举到。
 * writable：布尔值，表示属性是否可以被修改（默认为 true）。
 * configurable：布尔值，表示是否可以删除该属性或者修改它的特性（默认为 true）。
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {  // 使用 Object.defineProperty 定义对象的属性
    value: val,  // 设置属性值
    enumerable: !!enumerable,  // 设置属性是否可枚举
    writable: true,  // 设置属性是否可写
    configurable: true  // 设置属性是否可配置
  })
}

/**
 * 解析简单的路径（如 obj.a.b.c）。
 */
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)  // 定义一个正则表达式，匹配非法字符
export function parsePath (path: string): any {
  if (bailRE.test(path)) {  // 如果路径中包含非法字符，则返回 undefined
    return
  }
  const segments = path.split('.')  // 根据点分隔路径，返回路径的各个部分
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {  // 遍历路径的每个部分
      if (!obj) return  // 如果对象为空，返回 undefined
      obj = obj[segments[i]]  // 获取对象的当前属性值
    }
    return obj  // 返回最终的值
  }
}
