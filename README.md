# Vue 3 + Vite

## 通过 vite 脚手架安装

```js
yarn create vite vue3-hello  --template vue
cd vue3-hello
yarn
yarn dev
```

## 值得注意的新特性

### 新增的属性

- emits 选项
- Vue 3 现在正式支持了多根节点的组件，也就是片段，但是需要显式定义 attribute 应该分布在哪里
- 对于 v-if/v-else/v-else-if 的各分支项 key 将不再是必须的，因为现在 Vue 会自动生成唯一的 key。
- Suspense 是一个试验性的新特性，其 API 可能随时会发生变动。特此声明，以便社区能够为当前的实现提供反馈。

### 删除的属性

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
- $listeners 移除，$listeners 对象在 Vue 3 中已被移除。事件监听器现在是 $attrs 的一部分
- propsData 选项之前用于在创建 Vue 实例的过程中传入 prop，现在它被移除了。如果想为 Vue 3 应用的根组件传入 prop，请使用 createApp 的第二个参数
- v-on.native 移除，新增的 emits 选项允许子组件定义真正会被触发的事件。

### 非兼容的属性

- 函数式组件，建议只使用有状态的组件，函数式组件只能由接收 props 和 context (即：slots、attrs、emit) 的普通函数创建
- 全局 api
- v-bind 的绑定顺序会影响渲染结果。

## 前置知识

- 在 Vue 2 中，函数式组件主要有两个应用场景：
  - 作为性能优化，因为它们的初始化速度比有状态组件快得多
  - 返回多个根节点

## vue3 写法

- template v-for

```js
// vue2 <template> 标签不能拥有 key
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

```js
// vue3 key 则应该被设置在 <template> 标签上
<template v-for="item in list" :key="item.id">
  <div>...</div>
  <span>...</span>
</template>
```

```js
// <!-- 类似地，当使用 <template v-for> 时如果存在使用 v-if 的子节点，则 key 应改为设置在 <template> 标签上。 -->
// <!-- Vue 2.x -->
<template v-for="item in list">
  <div v-if="item.isVisible" :key="item.id">...</div>
  <span v-else :key="item.id">...</span>
</template>

// <!-- Vue 3.x -->
<template v-for="item in list" :key="item.id">
  <div v-if="item.isVisible">...</div>
  <span v-else>...</span>
</template>
```

## v-if 与 v-for 的优先级对比

- 2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用
- 3.x 版本中 v-if 总是优先于 v-for 生效。
  由于语法上存在歧义，建议避免在同一元素上同时使用两者。
  比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。

## VNode 生命周期事件

在 Vue 2 中，我们可以通过事件来监听组件生命周期中的关键阶段。这些事件名都是以 hook: 前缀开头，并跟随相应的生命周期钩子的名字。
在 Vue 3 中，这个前缀已被更改为 vnode-。额外地，这些事件现在也可用于 HTML 元素，和在组件上的用法一样

```js
// vue2
<template>
  <child-component @hook:updated="onUpdated">
</template>

// vue3
<template>
  <child-component @vnode-updated="onUpdated">
</template>
```

绝大多数情况下只需要修改前缀。生命周期钩子 beforeDestroy 和 destroyed 已经分别被重命名为 beforeUnmount 和 unmounted，所以相应的事件名也需要更新

## 侦听数组

当侦听一个数组时，只有当数组被替换时才会触发回调。如果你需要在数组被改变时触发回调，必须指定 deep 选项。

```js
watch: {
  bookList: {
    handler(val, oldVal) {
      console.log('book list changed')
    },
    deep: true
  },
}
```
