const http = require('http');

/**
 * 强缓存和协商缓存
 *
 * 强缓存：浏览器在缓存中直接读取资源，不会向服务器发送请求。
 * 协商缓存：浏览器向服务器发送请求，服务器根据资源是否修改决定是否使用缓存。
 */

// 强缓存示例：通过 Cache-Control 或 Expires 实现
// Cache-Control: max-age=3600 表示资源在 3600 秒内有效
// Expires: 指定资源的过期时间（HTTP/1.0，已被 Cache-Control 替代）
// 🔹 实现方式
// 由 响应头（Response Header） 控制：
// Cache-Control（HTTP/1.1）
// 常用指令：
// max-age=3600：资源在 3600 秒（1小时）内有效，浏览器直接使用缓存
// public：表示该响应可以被任何缓存区缓存
// private：只允许客户端缓存
// no-cache：仍会请求服务器（进入协商缓存流程）
// no-store：完全禁止缓存
// Expires（HTTP/1.0）
// 设置一个绝对过期时间，例如：Expires: Wed, 21 Oct 2025 07:28:00 GMT
// ⚠️ 它已被 Cache-Control 替代，但老版本浏览器仍在使用

// 🔹 流程
// 浏览器访问资源
// 响应中带有 Cache-Control: max-age=3600
// 在 1 小时内再次访问相同资源：
// 浏览器直接从 本地缓存读取
// 不发送请求到服务器

// 🔹 强缓存的表现
// 浏览器控制台 Network 面板中，该资源状态是 200 (from disk cache) 或 200 (from memory cache)
// 不会发起 HTTP 请求


// 二、协商缓存

// 协商缓存示例：通过 ETag 或 Last-Modified 实现
// 浏览器发送请求给服务器，服务器根据特定条件判断是否返回新资源或让浏览器使用缓存。
// ETag: 资源的唯一标识符，资源变化时 ETag 也会变化
// Last-Modified: 资源的最后修改时间
// 🔹 实现方式
// 由以下 请求头 + 响应头 控制：

// 1. 基于修改时间的协商缓存
// 首次响应时服务器返回：
// Last-Modified: Tue, 21 May 2024 08:00:00 GMT
// 浏览器下次请求时会带上：
// If-Modified-Since: Tue, 21 May 2024 08:00:00 GMT
// 服务器比较资源修改时间：
// 没有修改：返回 304 Not Modified
// 修改了：返回 200 OK + 新资源内容


// 2. 基于内容摘要（哈希）的协商缓存
//     首次响应时服务器返回：
          // ETag: "abc123"
//     浏览器下次请求时会带上：
//          If-None-Match: "abc123"

// 服务器对比内容哈希：
// 一致：返回 304
// 不一致：返回 200 + 新资源


// ✅ 对比总结：强缓存 vs 协商缓存
// | 特性     | 强缓存（Cache-Control/Expires） | 协商缓存（ETag / Last-Modified） |
// | ------ | -------------------------- | -------------------------- |
// | 是否发送请求 | ❌ 不发送                      | ✅ 发送                       |
// | 资源使用位置 | 本地缓存                       | 本地缓存（需服务器确认）               |
// | 返回状态码  | 200 (from cache)           | 304 Not Modified           |
// | 控制字段   | `Cache-Control`, `Expires` | `ETag`, `Last-Modified`    |
// | 性能     | ✅ 更快（零请求）                  | 较快（少量请求，无资源返回）             |

// 示例代码：模拟强缓存和协商缓存的逻辑

const server = http.createServer((req, res) => {
  const url = req.url;
  const now = new Date();
  const lastModified = new Date(now.getTime() - 10000); // 10 秒前修改
  const etag = '12345'; // 模拟的 ETag 值

  if (url === '/strong-cache') {
    // 强缓存
    res.setHeader('Cache-Control', 'max-age=30'); // 缓存 30 秒
    res.end('This is strong cache response');
  } else if (url === '/negotiation-cache') {
    // 协商缓存
    const ifModifiedSince = req.headers['if-modified-since'];
    const ifNoneMatch = req.headers['if-none-match'];

    if (ifNoneMatch === etag) {
      res.writeHead(304); // 资源未修改
      res.end();
    } else if (ifModifiedSince && new Date(ifModifiedSince) >= lastModified) {
      res.writeHead(304); // 资源未修改
      res.end();
    } else {
      res.setHeader('Last-Modified', lastModified.toUTCString());
      res.setHeader('ETag', etag);
      res.end('This is negotiation cache response');
    }
  } else {
    res.end('Hello, world!');
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});