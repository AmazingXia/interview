



4. 实战中的装饰者模式 4.1 给浏览器事件添加新功能

window.onload = function() {
    console.log('原先的 onload 事件 ')
}

/* 发送埋点信息 */
function sendUserOperation() {
    console.log('埋点：用户当前行为路径为 ...')
}

/* 将新的功能添加到 onload 事件上 */
window.onload = function() {
    var originOnload = window.onload
    return function() {
        originOnload && originOnload()
        sendUserOperation()
    }
}()

// 输出： 原先的 onload 事件
// 输出： 埋点：用户当前行为路径为 ...



4.2 TypeScript 中的装饰器

