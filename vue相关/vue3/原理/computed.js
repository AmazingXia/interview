import { ref, computed } from 'vue'

// 响应式数据
const firstName = ref('John')
const lastName = ref('Doe')

// 计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})


const fullName2 = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val) => {
    const [first, last] = val.split(' ')
    firstName.value = first
    lastName.value = last
  }
})

// 使用时可以读写 fullName：
fullName.value = 'Alice Smith'