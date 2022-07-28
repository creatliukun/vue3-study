import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App)
// 注册“全局”组件的,也可以链式调用
// app.component('SearchInput', SearchInputComponent)
// app.directive('focus', FocusDirective)
// app.use(LocalePlugin)
//与大多数应用方法不同的是，mount 不返回应用本身。相反，它返回的是根组件实例
const vm = app.mount('#app')
// console.log(vm.get('count'), 'vm')
// vm.$data.count = 6
console.log(vm, 'vmm')
