<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue' // 导入组件后，不用注册了，就可以使用
import { ref } from 'vue'
let count = ref(0)
const increment = (count) => {
  console.log('increment点击',count)
  // count++ 
}

</script>

<template>
  <div>
   {{count}}
  </div>
   <button v-bind:disabled=truthy @click="increment(count)">按钮</button>
  <HelloWorld msg="组件传递" />
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
