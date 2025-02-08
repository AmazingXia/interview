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
