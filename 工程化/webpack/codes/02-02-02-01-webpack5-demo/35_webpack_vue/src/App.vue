<template>
  <div>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '前端'
    }
  },
}
</script>

<style lang="less" scoped>
  .title{
    color: red;
  }
</style>