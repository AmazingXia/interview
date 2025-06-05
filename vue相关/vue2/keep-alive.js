// 所有会被 <keep-alive> 缓存的组件都写上 name

// Vue 中的 <keep-alive> 确实依赖组件的 name 属性 来进行缓存识别和匹配。

没有设置 name 的后果：
<keep-alive> 无法识别和匹配该组件。
include / exclude 将无法生效。
默认缓存所有子组件（没有 include/exclude 时），仍然会缓存，但你将无法控制哪些缓存、哪些不缓存。


1. include
类型：String | RegExp | Array
作用：只有匹配的组件才会被缓存。

<keep-alive include="User,Home">
  <router-view />
</keep-alive>


2. exclude
类型：String | RegExp | Array
作用：排除匹配的组件，不缓存。


<keep-alive exclude="Login">
  <router-view />
</keep-alive>


3. max
类型：number
作用：缓存的组件实例的最大数量，超过数量会 LRU（最近最少使用）置换。

<keep-alive :max="5">
  <router-view />
</keep-alive>



三、生命周期钩子配合使用
使用 <keep-alive> 后，组件会新增两个生命周期钩子：

activated()：组件从缓存中激活时触发

deactivated()：组件被缓存时触发（不销毁）


四、底层原理（源码解析简略）
Vue 在渲染 keep-alive 的子组件时：

首次渲染：正常挂载，组件实例被缓存（使用 Map 存储）。

下次切换回来时：

不重新创建组件实例，而是从缓存中复用。

触发 activated 生命周期。

切换出去时：

不销毁组件实例，只是 vnode.el 被移除。

触发 deactivated 生命周期。

超出 max 时：使用 LRU 缓存策略，移除最久未使用的组件。



五、使用建议
搭配 <router-view> 使用时建议加 :key 明确区分组件。

避免对大型组件频繁创建和销毁，提升性能。

注意避免缓存导致的数据“陈旧”问题，可结合 activated 重置数据。

如果使用 <transition>，建议放在 <keep-alive> 外部。

| 是否设置 `name` | 匹配缓存控制                   | 会被缓存        | 可控性 |
| ----------- | ------------------------ | ----------- | --- |
| ✅ 设置了       | ✅ 可通过 include/exclude 控制 | ✅ 会缓存       | ✅ 高 |
| ❌ 未设置       | ❌ 无法匹配                   | ✅ 会缓存（无法控制） | ❌ 低 |
