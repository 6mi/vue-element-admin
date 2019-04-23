<template>
  <el-container class="l-container">
    <el-header class="l-header" height="">
      <div class="h-title">
        <span>查 询</span>
      </div>
      <el-form class="search-form">
        <el-form-item label="菜单名称">
          <el-input
            v-model="searchMenuName"
            placeholder="支持模糊查询"
            style="width:160px"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit(-1, { id: 0 })">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="l-main">
      <div class="h-title">
        <span>列 表</span>
      </div>
      <el-table
        :data="list"
        height="640px"
        stripe
        highlight-current-row
        style="font-size:12px;"
        row-key="id"
      >
        <el-table-column
          label="序号"
          type="index"
          width="45"
          :index="indexMethod"
        />
        <el-table-column label="编 号" width="180" prop="menuCode" />
        <el-table-column label="名 称" width="180" prop="menuName" />
        <el-table-column label="值" width="180" prop="menuValue" />
        <el-table-column label="类 型" width="180" prop="menuTypeName" />
        <el-table-column label="排 序" prop="order" width="120" />
        <el-table-column label="操 作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编 辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.$index, scope.row)"
            >
              删 除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-main>
    <edit-menu ref="editMenu" :is-visible.sync="isVisible" @reload="loading" />
  </el-container>
</template>

<script>
import { getPermissions } from '@/api/sys-config'
import EditMenu from './edit-menu'

export default {
  name: 'Menu',
  components: { EditMenu },
  data() {
    return {
      primaryKey: 0,
      searchMenuName: '',
      list: null,
      total: 50,
      currentPage: 1,
      pageSize: 20,
      isVisible: false
    }
  },
  mounted: function() {
    this.getPermissions()
      .then(() => {})
      .catch(() => {})
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(this.pageSize)
      var data = this.initData()
      this.list = data.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },
    handleCurrentChange(val) {
      this.currentPage = val
      var data = this.initData()
      this.list = data.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },
    handleDel(index, row) {
      this.$confirm('确定删除吗?')
        .then(() => {
          console.log(row)
          console.log('yes')
        })
        .catch(() => {
          console.log('no')
        })
    },
    handleEdit(index, row) {
      var id = row.id
      if (id) {
        this.isVisible = true
        this.$refs.editMenu.loading(id)
      }
    },
    async getPermissions() {
      var { data, msg, result } = await getPermissions()
      if (result) {
        this.list = data
      } else {
        alert(msg)
      }
    },
    loading() {
      this.getPermissions()
    }
  }
}
</script>

<style>
.l-container {
  min-height: calc(100vh - 84px);
}
.l-header {
  height: 150px;
  border: 1px solid #e5e5e5;
  padding: 1px 0px 1px 0px;
}
.l-main {
  padding: 0px;
}
.h-title {
  width: 100%;
  height: 30px;
  background-color: #f9f9f9;
  border: 1px solid #dfdfdf;
  font-size: 12px;
  line-height: 30px;
  color: #737373;
  border-top: 0px;
}
.h-title span {
  margin-left: 14px;
}

.search-form {
  font-size: 16px;
}
</style>

