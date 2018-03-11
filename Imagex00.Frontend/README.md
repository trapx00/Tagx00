# Image x00 前端基础架构

这个架构是基于[我的博客前端](https://github.com/viccrubs/VicBlog-Frontend)的，包括以下技术/框架，都是截至commit的时候的最新版。

- React
- MobX
- TypeScript
- React-Router
  - 页面按需加载
- Ant Design
- Webpack 4
- mocha enzy chai （测试用的）
- 自己实现的基于MobX国际化框架


## 演示功能

- 多语言，热切换
  - src/app/components/LanguageSelector
- 获得 http://vicblogapi.azurewebsites.net/articles 这个地址的数据并显示在页面中
  - src/app/components/ArticleListDisplay

个人感觉应该能够支持这次的前端开发。

## 相关命令

### 安装依赖

`npm install`

### 开始开发

`npm start`

对代码做出更改会自动刷新页面

### 打包

`npm run build`

先会清空dist文件夹下的内容（使用deploy/cleandist.ts），再把新打包好的文件放进去

# TODO

- 服务器端渲染
- Hot Module Replacement（babel太坑了）
- 单元测试示例