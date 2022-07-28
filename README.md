# Vue 3 + Vite

## 通过 vite 脚手架安装

```js
yarn create vite vue3-hello  --template vue
cd vue3-hello
yarn
yarn dev
```

## 值得注意的新特性

###  新增的属性

  - emits 选项
  - Vue 3 现在正式支持了多根节点的组件，也就是片段，但是需要显式定义 attribute 应该分布在哪里

###  删除的属性
  - $children
  - $on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口
  - filters 过滤器移除了 vue3 中建议用 方法调用 或 计算属性实现，如果想实现全局过滤器，那么可以用全局属性来实现，也就是 globalProperties 上挂载一个$filters
  ```js
  const app = createApp(App);
  app.config.globalProperties.$filters = {
    currencyUSD(value) {
      return "$" + value;
    },
  };
  ```
  - 使用方式,直接在模板中获取到全局的$filters，只不过是方法，而不是计算属性，因为计算属性只在单个的组件中定义才有意义
  ```js
      <template>
      <h1>Bank Account Balance</h1>
      <p>{{ $filters.currencyUSD(accountBalance) }}</p>
      </template>
  ```
  - Vue.config.productionTip 移除
  - Vue.extend 移除
  - config.ignoredElements 替换为 config.isCustomElement
  - Vue.prototype 替换为 config.globalProperties



###  非兼容的属性
   - 函数式组件，建议只使用有状态的组件，函数式组件只能由接收 props 和 context (即：slots、attrs、emit) 的普通函数创建
   - 全局api


## 前置知识
+  在 Vue 2 中，函数式组件主要有两个应用场景：
   - 作为性能优化，因为它们的初始化速度比有状态组件快得多
   - 返回多个根节点

