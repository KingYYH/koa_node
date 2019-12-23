<template>
  <div>
    <h1 style="text-align: center;margin-top: 100px">{{ auth }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        auth: '权限'
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
  }
</style>
