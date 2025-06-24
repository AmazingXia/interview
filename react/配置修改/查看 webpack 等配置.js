// 使用 create-react-app 创建的 React 项目，默认是隐藏配置的（使用了 react-scripts 来封装）。你可以使用以下命令来运行项目或查看配置信息：




// 🔍 显示配置（查看 webpack 等配置）
// 默认项目不暴露 webpack 配置。如果你想查看或修改配置，有以下两种方式：

// ✅ 方法一：使用 eject 命令（不可逆操作）
// npm run eject
// yarn eject
// 执行后会把 react-scripts 中封装的配置（如 Webpack、Babel、ESLint 等）全部拷贝到你的项目中，你就可以直接修改这些配置了。但注意：

// 这一步不可撤销
// 项目结构会变复杂
// 适用于需要完全自定义配置的项目



// ✅ 方法二：使用社区工具（不 eject）
// 推荐使用 craco 或 [react-app-rewired] 等工具进行“非侵入式”的配置修改。

// 例如使用 craco：
// 安装 craco：
// npm install @craco/craco --save

// 修改 package.json 脚本：
// "scripts": {
//   "start": "craco start",
//   "build": "craco build",
//   "test": "craco test"
// }
// 创建 craco.config.js 文件，开始修改 Webpack 等配置。





// 使用 react-app-rewired 可以在 不 eject 的情况下修改 create-react-app 的默认配置，如 Webpack、Babel、ESLint 等，非常适合需要自定义但又不想暴露所有配置的情况。
// 下面是使用 react-app-rewired 的完整流程：
// ✅ 安装 react-app-rewired
// npm install react-app-rewired --save-dev
// ✅ 修改 package.json 脚本
// 找到 scripts 部分，将默认的 react-scripts 替换为 react-app-rewired：
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
// ⚠️ eject 仍然保留使用原始的 react-scripts，防止误操作。

// ✅ 创建配置文件 config-overrides.js（项目根目录）
// 这个文件用于重写 CRA 的默认配置。

// 示例：修改 Webpack 添加别名

const path = require('path');

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@components': path.resolve(__dirname, 'src/components'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };
  return config;
};
// ✅ 启动项目
// npm start
// 此时你就可以在项目中这样引用模块：

import MyComponent from '@components/MyComponent';




// 🔧 配合插件（如 customize-cra）
// 如果想更方便地修改配置，可结合 customize-cra 使用：
// npm install customize-cra --save-dev
// 然后这样写 config-overrides.js：

const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@api': path.resolve(__dirname, 'src/api'),
  })
);