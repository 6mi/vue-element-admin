<template>
  <div>菜单列表:
    <el-input v-model="input" placeholder="请输入内容" />
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      input: '1213'
    }
  }
}
</script>

<style>
  el-input{
    width: 120px;
  }
</style>

