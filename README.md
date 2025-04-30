# 济宁中西医结合医院云桌面项目

基于React + Ant Design开发的医院云桌面管理系统。

## 功能特性

- 桌面管理：创建、编辑、删除和管理虚拟桌面
- 模板管理：管理不同部门的桌面模板
- 备份策略：配置和管理数据备份策略
- 终端管理：管理和监控终端设备

## 开始使用

### 环境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 安装步骤

1. 克隆项目到本地：

```bash
git clone https://github.com/[your-username]/hospital-cloud-desktop.git
cd hospital-cloud-desktop
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm start
```

4. 打开浏览器访问：

```
http://localhost:3000
```

### 构建部署

构建生产环境版本：

```bash
npm run build
```

构建完成后，`build` 文件夹中包含了可部署的文件。

## 技术栈

- React 18
- Ant Design 5
- React Router 6
- Moment.js

## 项目结构

```
src/
  ├── components/     # 通用组件
  ├── pages/         # 页面组件
  ├── layouts/       # 布局组件
  ├── utils/         # 工具函数
  ├── App.js         # 应用入口
  └── index.js       # 项目入口
```

## 开发团队

- 前端开发团队
- UI设计团队
- 后端开发团队

## 许可证

MIT License 