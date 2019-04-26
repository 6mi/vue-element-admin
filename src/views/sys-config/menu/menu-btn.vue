<template>
  <el-dialog
    title="按钮列表"
    :visible="true"
    width="45%"
    @close="handClose"
  >
    <el-table stripe highlight-current-row>
      <el-table-column label="按钮名称" />
      <el-table-column label="按钮编号" />
      <el-table-column label="按钮排序" />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'MenuBtn',
  data() {
    return {}
  },
  methods: {
    handClose: function() {
      this.$emit('update:hack-btn-reset', false)
    }
  }
}
</script>

