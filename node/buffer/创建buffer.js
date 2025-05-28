/**
 * Buffer Instance Methods:
 *
 * - `fill(value, [offset], [end], [encoding])`: Fills the buffer with the specified value.
 * - `write(string, [offset], [length], [encoding])`: Writes a string to the buffer at the specified offset.
 * - `toString([encoding], [start], [end])`: Extracts data from the buffer and returns it as a string.
 * - `slice([start], [end])`: Returns a new buffer that references the memory of the original buffer, sliced from start to end.
 * - `indexOf(value, [byteOffset], [encoding])`: Searches the buffer for the specified value and returns its index, or -1 if not found.
 * - `copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])`: Copies data from the buffer to the target buffer.
 */


// concat：将多个 buffer 拼接成一个新的 buffer
const buffer1 = Buffer.from('Hello, ');
const buffer2 = Buffer.from('World!');
const buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(buffer3.toString()); // 输出: Hello, World!

// isBuffer：判断当前数据是否为 buffer
const isBuffer1 = Buffer.isBuffer(buffer1);
const isBuffer2 = Buffer.isBuffer('Not a buffer');
console.log(isBuffer1); // 输出: true
console.log(isBuffer2); // 输出: false



// 创建 Buffer 实例
// • alloc：创建指定字节大小的 buffer
// • allocUnsafe：创建指定大小的 buffer（不安全）
// • from：接收数据，创建 buffer



// fill：用指定的值填充 buffer
const bufferFill = Buffer.alloc(10);
bufferFill.fill('A');
console.log(bufferFill.toString()); // 输出: AAAAAAAAAA

// write：在 buffer 的指定位置写入字符串
const bufferWrite = Buffer.alloc(15);
bufferWrite.write('你好', 0, 'utf8');
console.log(bufferWrite.toString()); // 输出: 你好

// toString：将 buffer 转换为字符串
const bufferToString = Buffer.from('学习Buffer');
console.log(bufferToString.toString('utf8')); // 输出: 学习Buffer

// slice：从 buffer 中截取一部分
const bufferSlice = Buffer.from('Hello, World!');
const slicedBuffer = bufferSlice.slice(7, 12);
console.log(slicedBuffer.toString()); // 输出: World

// indexOf：查找指定值在 buffer 中的位置
const bufferIndexOf = Buffer.from('Buffer 示例');
const index = bufferIndexOf.indexOf('示');
console.log(index); // 输出: 7

// copy：将 buffer 的内容复制到另一个 buffer
const sourceBuffer = Buffer.from('复制内容');
const targetBuffer = Buffer.alloc(10);
sourceBuffer.copy(targetBuffer, 0, 0, sourceBuffer.length);
console.log(targetBuffer.toString()); // 输出: 复制内容