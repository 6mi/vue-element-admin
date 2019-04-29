<template>
  <el-dialog
    title="按钮列表"
    :visible="true"
    width="45%"
    class="btn-dialog"
    @close="handClose"
  >
    <el-button
      type="primary"
      style="width:120px;height:30px;padding:0;margin-bottom: 2px;"
      @click="add"
    >
      新 增
    </el-button>
    <el-table
      stripe
      highlight-current-row
      style="border-top:1px solid #dfdfdf"
      :data="list"
    >
      <el-table-column label="按钮名称">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.btnName" placeholder="名 称" />
          </template>
          <span v-else>{{ row.btnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="按钮编号">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.btnCode" placeholder="编 号" />
          </template>
          <span v-else>{{ row.btnCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="按钮排序">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model.number="row.order" placeholder="排 序" />
          </template>
          <span v-else>{{ row.order }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操 作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            plain
            @click="del(scope.$index, scope.row)"
          >
            删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handClose">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMenuBtnList, editMenuBtn, delMenuBtn } from '@/api/sys-config'

export default {
  name: 'MenuBtn',
  props: {
    menuId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted: function() {
    this.loading()
  },
  methods: {
    handClose: function() {
      this.$emit('update:hack-btn-reset', false)
    },
    submit() {
      if (this.list.length <= 0) {
        this.$message({
          message: '没有需要提交的数据',
          type: 'warning'
        })
      }

      var data = []
      this.list.map(_ => {
        if (_.edit) {
          _.menuId = this.menuId
          data.push(_)
        }
      })

      editMenuBtn(data)
        .then(res => {
          if (res.result) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$emit('update:hack-btn-reset', false)
          }
        })
        .catch(() => {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        })
    },
    add() {
      this.list.push({ edit: true })
    },
    del(index, row) {
      if (!row.edit) {
        this.$confirm(`是否要删除${row.btnName}`)
          .then(() => {
            if (row.id) {
              delMenuBtn(row.id).then(res => {
                if (res.result) {
                  this.loading()
                  this.$message({
                    message: '删除数据成功',
                    type: 'success'
                  })
                }
              })
            }
          })
          .then(() => {})
      } else {
        this.list.splice(index, 1)
      }
    },
    loading() {
      if (this.menuId > 0) {
        getMenuBtnList(this.menuId).then(res => {
          if (res.result) {
            this.list = res.data
          }
        })
      }
    }
  }
}
</script>

<style>
.btn-dialog .el-dialog__body {
  padding: 5px 10px;
}
</style>
