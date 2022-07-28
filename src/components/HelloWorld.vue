<script>
// 这种写法有点像react中的函数
// setup script`语法糖提供了三个新的`API`来供我们使用：`defineProps`、`defineEmits`和`useContext
// defineProps({ // 用来接收父组件传来的值props
//   msg: String
// }) 
// defineEmits({}) //用来声明触发的事件表
// useContext({}) //用来获取组件上下文context

// const rawHtml =<div style="color: red">这是红色</div>
</script>/

<template>
  <h1>{{ msg }}</h1>

 <p>使用 v-html渲染原生组件: <span v-html="rawHtml"></span></p>



</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
