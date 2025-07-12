// 前端绕过策略 和 后端支持策略。


// 一、前端解决方案（绕过跨域）
// 1. JSONP（只能用于 GET 请求）
// 原理：利用 <script> 标签不受同源策略限制，向服务器发送一个带 callback 参数的请求，服务器返回一段 JS 脚本，执行回调。
// 优点：兼容性好，使用简单。
// 缺点：只能 GET 请求，不安全，有 XSS 风险。


// 2. CORS with credentials + document.domain（同主域不同子域场景）
// 修改两端的 document.domain = "example.com"。
// 适用于 a.example.com 与 b.example.com 的通信。
// 仅适用于前后端都能控制的环境，且需用 iframe 等实现。



// 3. postMessage（主用于 iframe 通信）
// 原理：通过 window.postMessage 实现跨域消息通信。
// 场景：父子窗口、iframe 通信。


// 4. 跨域代理（前端开发阶段用得最多）
// a. webpack-dev-server 的 proxy
// b. Vite 的 proxy


// 二、后端解决方案（支持跨域）
// 1. CORS（跨域资源共享）
// Access-Control-Allow-Origin: https://frontend.example.com
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type
// Access-Control-Allow-Credentials: true



// 2. Nginx 反向代理
// 原理：将跨域请求统一转发给后端接口，前端以为请求的是同源。
// location /api/ {
//   proxy_pass http://backend.example.com/;
//   add_header Access-Control-Allow-Origin *;
// }

// 3. Node.js 中间件跨域处理
// 如 Express 中：
const cors = require('cors');
app.use(cors({
  origin: 'http://frontend.example.com',
  credentials: true
}));

// 🧪 三、其他特殊跨域通信方式（了解）

1. WebSocket
不受同源策略限制，一旦连接建立后，前端可以自由通信。

2. 服务器中转（Server-Side Proxy）
在自己的后端中写接口，转发请求到目标接口。