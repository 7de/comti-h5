# comti-h5

> 基于vue2.0 + webpack2.0 + vux2.9.2

## VUX文档
+ [中文文档](https://vux.li/)
+ English(working)

## Quick Start（不想下载源码，可直接快速安装）
``` bash
npm install vue-cli -g
vue init airyland/vux2 projectPath

cd projectPath
npm install // or yarn
npm run dev // or yarn dev
```

## Build Setup

``` bash
# install dependencies
npm install vue-cli -g # 如果还没安装
npm install --registry=https://registry.npm.taobao.org # 或者 cnpm install 

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```

## 安装vee_validate报错
``` bash
# _WEBPACK_IMPORTED_MODULE_1_vee_validate__.a.addLocale is not a function
# 版本需要回退到25
npm install vee-validate@2.0.0-rc.25
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
