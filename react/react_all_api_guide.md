# React API 全面笔记（分类 + 用途 + 示例）

## ✅ 组件类 API

| API | 用途 | 示例 |
|-----|------|------|
| `Component` | 创建类组件，有生命周期 | `class App extends React.Component {}` |
| `PureComponent` | 类似 Component，自带浅比较提升性能 | `class App extends React.PureComponent {}` |
| `Fragment` | 无额外 DOM 的容器 | `<>多个元素</>` |
| `StrictMode` | 开发模式下启用额外检查 | `<StrictMode><App /></StrictMode>` |
| `Profiler` | 性能监控回调 | `<Profiler onRender={fn}>...</Profiler>` |
| `forwardRef` | 转发 ref 到子组件 | `const Comp = forwardRef((props, ref) => ...)` |
| `memo` | 组件结果缓存 | `const Comp = memo(MyComponent)` |

---

## 🔧 核心 Hooks

| Hook | 用途 | 示例 |
|------|------|------|
| `useState` | 本地状态 | `const [count, setCount] = useState(0)` |
| `useEffect` | 副作用处理 | `useEffect(() => {...}, [])` |
| `useRef` | 持久变量/访问 DOM | `const ref = useRef()` |
| `useCallback` | 缓存函数引用 | `const fn = useCallback(() => {...}, [])` |
| `useMemo` | 缓存计算值 | `const value = useMemo(() => calc(), [dep])` |
| `useReducer` | 状态逻辑集中处理 | `useReducer(reducer, initial)` |
| `useLayoutEffect` | DOM 渲染前运行副作用 | `useLayoutEffect(() => {...}, [])` |

---

## 🧠 高级/并发 Hooks

| Hook | 用途 | 示例 |
|------|------|------|
| `useTransition` | 标记 UI 更新为非紧急 | `const [isPending, startTransition] = useTransition()` |
| `useDeferredValue` | 延迟某个值的变更 | `const deferred = useDeferredValue(value)` |
| `useSyncExternalStore` | 订阅外部 store | `useSyncExternalStore(sub, snap)` |
| `useInsertionEffect` | CSS 注入前执行 | `useInsertionEffect(() => {...})` |
| `useImperativeHandle` | 自定义暴露 ref 方法 | `useImperativeHandle(ref, () => ({ focus }))` |
| `useId` | 稳定唯一 ID（SSR 安全） | `const id = useId()` |
| `useDebugValue` | DevTools 调试值 | `useDebugValue("Online")` |

---

## 🧪 实验性 Hooks & 并发支持

| API | 用途 | 示例 |
|-----|------|------|
| `useActionState` | 配合 server action 管理表单提交 | `const [val, action] = useActionState(fn, init)` |
| `use` | 等待 Promise 或 context（RSC） | `const user = use(fetchUser())` |
| `experimental_useEffectEvent` | 稳定事件引用供 effect 使用 | `const cb = experimental_useEffectEvent(fn)` |
| `useOptimistic` | 乐观 UI 更新 | `const [data, update] = useOptimistic(init, reducer)` |

---

## 🧰 元素、上下文、引用类 API

| API | 用途 | 示例 |
|-----|------|------|
| `createContext` | 创建上下文对象 | `const Ctx = createContext()` |
| `useContext` | 读取 context 值 | `useContext(Ctx)` |
| `cloneElement` | 克隆并修改子元素 | `cloneElement(child, { ... })` |
| `createElement` | 手动创建元素 | `createElement('div', {}, 'text')` |
| `isValidElement` | 判断是否为合法 React 元素 | `isValidElement(child)` |
| `createRef` | 创建类组件 ref | `this.inputRef = createRef()` |

---

## ⏳ 异步支持组件

| API | 用途 | 示例 |
|-----|------|------|
| `Suspense` | 异步组件加载等待 | `<Suspense fallback={...}>...</Suspense>` |
| `lazy` | 动态导入组件 | `const Comp = lazy(() => import('./Comp'))` |

---

## 🧩 实验性/unstable API（了解即可）

| API | 用途 |
|-----|------|
| `cache` | 缓存异步资源（配合 `use`） |
| `cacheSignal` | 用于监听缓存状态 |
| `unstable_SuspenseList` | 控制多个 `Suspense` 顺序 |
| `unstable_ViewTransition` | 页面切换动画支持 |
| `unstable_TracingMarker` | 性能跟踪 |
| `unstable_LegacyHidden` | 隐藏组件（旧版本兼容） |
| `unstable_Activity` / `Scope` | React Lab 实验中状态追踪 |

---

## 🔢 版本信息

| API | 用途 |
|-----|------|
| `version` | 当前 React 版本号 | `console.log(React.version)` |

---

## 🔚 学习建议

- **初学阶段：**聚焦函数组件 + 核心 Hooks（useState/useEffect/useRef/useContext）
- **进阶阶段：**掌握 useCallback/useMemo/useReducer/useLayoutEffect/useImperativeHandle
- **并发场景：**学习 `useTransition`、`Suspense`、`lazy`
- **实验/服务端方向：**了解 `useActionState`、`use`、`useOptimistic` 等 Server Actions 配套 API
