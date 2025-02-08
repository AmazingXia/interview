// 概念：
// 协商缓存是当强缓存失效时，浏览器向服务器发送请求，服务器通过某些标识（如 Last-Modified 或 ETag）判断资源是否发生变化，
// 如果没有变化，则返回 304 Not Modified，浏览器继续使用缓存的资源。

// 实现方式（HTTP 响应头）：

// Last-Modified & If-Modified-Since

// Last-Modified：服务器返回的资源的最后修改时间。
// If-Modified-Since：浏览器下一次请求时，会带上 Last-Modified 作为 If-Modified-Since，服务器比较该时间是否与资源的最新修改时间一致：
// 如果一致，返回 304 Not Modified，浏览器使用本地缓存。
// 如果不一致，返回新的资源，并更新 Last-Modified。
// ETag & If-None-Match

// ETag 是资源的唯一标识符（哈希值），只要资源变了，ETag 也会变。
// If-None-Match：浏览器请求时，带上上次的 ETag，服务器对比：
// 如果 ETag 一致，返回 304 Not Modified，使用本地缓存。
// 如果 ETag 不一致，返回新的资源，并更新 ETag。
// 流程：

// 资源过期后，浏览器向服务器发送带有 If-Modified-Since 或 If-None-Match 头的请求。
// 服务器检查资源是否更新：
// 如果未更新，返回 304，浏览器继续使用本地缓存。
// 如果更新了，返回新的资源。
// 特点：

// 相比强缓存，协商缓存可以保证资源的最新性。
// 协商缓存仍然需要发送请求，但返回的是 304 Not Modified，不会重新下载资源，减少了流量消耗。



// 4. 实际应用中的缓存策略
// 对于不常更改的资源（如 logo、字体、CSS、JS）：

// 使用 强缓存（Cache-Control: max-age=31536000, immutable）。
// 更新时使用新的 URL（如 logo_v2.png）。
// 对于可能变化的资源（如 HTML 文件、API 响应）：

// 使用 协商缓存（ETag + Last-Modified）。
// 避免强缓存导致用户访问的是旧的 HTML 页面。
// 如果资源需要实时更新（如 API 数据）：

// 直接使用 Cache-Control: no-cache，让浏览器每次都请求服务器。



// 5. 结合使用
// 实际项目中，强缓存和协商缓存通常是 一起使用的：

// 先检查强缓存（Cache-Control: max-age 或 Expires）。
// 强缓存失效后，进行协商缓存（ETag 或 Last-Modified）。
// 如果资源有更新，返回新资源；否则返回 304 Not Modified。
// 示例
// HTTP/1.1 200 OK
// Cache-Control: max-age=3600  # 1小时的强缓存
// ETag: "abc123"  # 资源的唯一标识
// Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT


// 当浏览器再次请求：
// GET /style.css HTTP/1.1
// If-None-Match: "abc123"
// If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT

// 如果资源未变，服务器返回：
// HTTP/1.1 304 Not Modified
// 这样，浏览器就能继续使用本地缓存的 style.css 了！

// 6. 结论
// 强缓存（Cache-Control: max-age）适用于静态资源，可以避免不必要的请求，提高性能。
// 协商缓存（ETag / Last-Modified）适用于经常变更但不希望重复下载的资源，可以减少带宽占用。
// 最佳实践是结合使用两者，优先使用强缓存，失效后进行协商缓存，提高性能的同时保证数据最新性。
// 这样，你的 Web 应用就能更快、更高效地运行！🚀