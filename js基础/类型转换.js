// 类型转换总结表

// 类型	        转为 Boolean	  转为 Number	  转为 String
// undefined	    false	        NaN	        "undefined"
// null	          false	         0	          "null"
// boolean	     false/true	    0/1	      "false"/"true"
// number	       false/true	   number	    number.toString()
// string	       false/true   	NaN	        "string"
// bigint	       false/true	   bigint	    bigint.toString()
// symbol	       false/true	   NaN	        "symbol"
// array	       false/true   	0/NaN	 "element1,element2,..."
// object	       false	        NaN   	 "[object Object]"


| 特性       | `number`                                       | `BigInt`                |
| -------- | ---------------------------------------------- | ----------------------- |
| 类型标识     | `typeof x === "number"`                        | `typeof x === "bigint"` |
| 数值范围     | ±1.7976931348623157e+308（非常大）                  | 理论上无限（受内存限制）            |
| 精度限制     | **最多 53 位有效二进制位**                              | **任意精度整数**              |
| 安全整数范围   | `-(2^53 - 1)` 到 `2^53 - 1`                     | 无限制                     |
| 常用边界值    | `Number.MAX_SAFE_INTEGER` = `9007199254740991` | 无需担心边界                  |
| 是否支持浮点   | ✅ 是（小数、指数都可以）                                  | ❌ 只能表示整数                |
| 性能       | 更快（由硬件直接支持）                                    | 较慢（需软件模拟大整数）            |
| 是否支持算术运算 | ✅（混用方便）                                        | ✅（但不能与 `number` 混用）     |


// 2. 特别的数组和对象转换规则

// 2.1 数组的转换规则
// 数组在 JavaScript 中的类型转换主要依赖于 toString() 方法。对于一个数组，它将会按如下方式转换：

// 数组会调用每个元素的 toString() 方法，并用逗号分隔每个元素的字符串表示。
// 数组转数字：

// 空数组：空数组 ([]) 转换为 0。
// ✅  ⚠️ 非空数组：数组被转换为字符串后，再被转换为数字。数组元素会被转为字符串并连接起来。

Number([]);              // 0
Number([1, 2, 3]);       // NaN
Number([10]);            // 10
String([1, 2, 3]);       // "1,2,3"

// 数组转字符串：

// 数组会被转换为以逗号分隔的元素的字符串。

String([1, 2, 3]);   // "1,2,3"
String([10]);         // "10"
String([]);           // ""


// 2.2 对象的转换规则
// 对象在进行类型转换时，会依赖于它的 toString() 或 valueOf() 方法：

// valueOf()：如果对象定义了该方法，JavaScript 会先调用 valueOf() 方法，如果返回的是基本类型（如数字、字符串、布尔值），则进行该类型的转换。
// toString()：如果 valueOf() 返回的是对象，或者对象没有 valueOf() 方法，则会调用 toString() 方法。


// 对象转数字：

// 默认情况下，对象在转为数字时，会调用 valueOf() 方法（如果 valueOf() 返回的是原始值），如果 valueOf() 返回的是对象，会再调用 toString() 方法。

Number({});          // NaN
Number({a: 1});      // NaN
Number({valueOf: () => 42});  // 42


// 对象转字符串：

// 调用 toString() 方法。如果对象没有显式的 toString() 方法，最终返回 "[object Object]"。

String({});                // "[object Object]"
String({a: 1});            // "[object Object]"
String({toString: () => "Hello"});  // "Hello"


// 数组的转换：数组转换为字符串时，会将元素转换为字符串并用逗号连接。转换为数字时，通常转换为空数组 [] 为 0，其他数组为 NaN。
// 对象的转换：对象通常依赖于 toString() 和 valueOf() 方法来决定如何转换。大多数情况下，直接转换为字符串时会得到 "[object Object]"。



// ✅ js 特殊意义的字母一览表
// | 字母  | 用途                  | 示例              | 含义说明                                   |
// | --- | ------------------- | --------------- | -------------------------------------- |
// | `e` | 科学计数法（指数）           | `1e3` → `1000`  | 表示 `10 的幂`                             |
// | `n` | `BigInt` 表示         | `123n`          | 表示大整数                                  |
// | `x` | 十六进制（前缀）            | `0xFF` → `255`  | 表示十六进制                                 |
// | `b` | 二进制（前缀）             | `0b1010` → `10` | 表示二进制                                  |
// | `o` | 八进制（前缀）             | `0o77` → `63`   | 表示八进制                                  |
// | `f` | **非语法含义（约定）**       | `0.1f` ❌        | JS 不支持 float 后缀，`f` 仅在某些语言中表示 float 类型 |
// | `d` | **无特殊含义**（但其他语言中常用） | JS 中无效          | 常在 C/C++ 等中表示 double                   |



// JS 是基于 C 语言风格的语言，而 C 就是用 0x 表示十六进制、0b 表示二进制。

// 0 是前缀标识符（用于进制识别） → 0x / 0b / 0o
// n 是后缀标识符（用于类型转换） → BigInt


// | 类型/进制  | 写法示例     | 说明           |
// | ------ | -------- | ------------ |
// | 十进制    | `123`    | 普通整数         |
// | 十六进制   | `0xFF`   | 前缀 `0x` 指定进制 |
// | 二进制    | `0b1010` | 前缀 `0b`      |
// | 八进制    | `0o77`   | 前缀 `0o`      |
// | BigInt | `123n`   | 后缀 `n` 指定类型  |




// 1️⃣ e – 科学计数法（指数表示）
console.log(1e3);   // 1000  （1 × 10³）
console.log(5e-2);  // 0.05  （5 × 10⁻²）
console.log(2.5e4); // 25000


// 2️⃣ n – BigInt 类型
const big = 123456789012345678901234567890n;
console.log(typeof big); // "bigint"
console.log(big + 1n);   // 正常加法


// 3️⃣ 0x / 0X – 十六进制

console.log(0xff);      // 255
console.log(0x1A + 1);  // 27


// 4️⃣ 0b / 0B – 二进制
console.log(0b1010);    // 10
console.log(0b1111);    // 15


// 5️⃣ 0o / 0O – 八进制

console.log(0o10);      // 8
console.log(0o77);      // 63


// | 图标 | 名称               | 场景        |
// | -- | ---------------- | --------- |
// | ✅  | `success`        | 操作成功提示    |
// | ⚠️ | `warning`        | 风险提醒、警告框  |
// | ❌  | `error` / `fail` | 失败提示      |
// | ℹ️ | `info`           | 帮助说明、信息提示 |
// | ⏳  | `loading`        | 加载中转圈     |
// | 💡 | `tip` / `idea`   | 小贴士、建议    |
