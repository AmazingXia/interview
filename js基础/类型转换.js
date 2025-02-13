// 类型转换总结表

// 类型	        转为 Boolean	  转为 Number	  转为 String
// undefined	    false	        NaN	        "undefined"
// null	          false	         0	          "null"
// boolean	     false/true	    0/1	      "false"/"true"
// number	       false/true	   number	    number.toString()
// string	       false/true   	NaN	        "string"
// array	       false/true   	0/NaN	 "element1,element2,..."
// object	       false	        NaN   	 "[object Object]"



// 2. 特别的数组和对象转换规则

// 2.1 数组的转换规则
// 数组在 JavaScript 中的类型转换主要依赖于 toString() 方法。对于一个数组，它将会按如下方式转换：

// 数组会调用每个元素的 toString() 方法，并用逗号分隔每个元素的字符串表示。
// 数组转数字：

// 空数组：空数组 ([]) 转换为 0。
// 非空数组：数组被转换为字符串后，再被转换为数字。数组元素会被转为字符串并连接起来。

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