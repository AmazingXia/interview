// •DOM限制：Worker 无法读取主线程所处理网页的DOM 对象，也就无法使用
// document、window 和 parent 等对象，只能访问 navigator 和 location 对象。
// •文件读取限制：Worker 子线程无法访问本地文件系统，这就要求所加载的脚本来自网
// 络。
// • 通信限制：主线程和 Worker 子线程不在同一个上下文内，所以它们无法直接进行通信，
// 只能通过消息来完成。
// • 脚本执行限制：虽然 Worker 可以通过 XMLHTTPRequest 对象发起 ajax 请求，但不能使
// 用 alert（）方法和 confirm（）方法在页面弹出提示。
// •同源限制：Worker 子线程执行的代码文件需要与主线程的代码文件同源。