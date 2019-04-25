<template>
  <el-dialog
    title="菜单编辑"
    :visible="isVisible"
    width="36%"
    @close="handClose"
  >
    <el-form ref="ruleForm" :model="entity" :rules="rules" label-width="120px">
      <el-form-item label="父级菜单">
        <el-select v-model="entity.parentMenuId" class="form-input">
          <el-option value="" label="请选择" />
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            :label="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单编号" prop="menuCode">
        <el-input
          v-model="entity.menuCode"
          suffix-icon="el-icon-edit"
          class="form-input"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          v-model="entity.menuName"
          suffix-icon="el-icon-edit"
          class="form-input"
        />
      </el-form-item>
      <el-form-item label="菜单值">
        <el-input
          v-model="entity.menuValue"
          suffix-icon="el-icon-edit"
          class="form-input"
        />
      </el-form-item>
      <el-form-item label="排 序">
        <el-input-number v-model="entity.order" class="form-input" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handClose">取 消</el-button>
      <el-button type="primary" @click="Submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<style>
.form-input {
  width: 85%;
}
</style>

<script>
import { getParentMenuList, submitMenu, getMenuEntity } from '@/api/sys-config'
export default {
  name: 'EditMenu',
  props: {
    isVisible: Boolean,
    primaryKey: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: null,
      entity: {
        id: null,
        parentMenuId: null,
        menuCode: '',
        menuName: '',
        menuValue: '',
        order: ''
      },
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: blur }
        ],
        menuCode: [{ required: true, message: '请输入菜单编号', trigger: blur }]
      }
    }
  },
  mounted: function() {
    this.getParentMenuList().then(res => {
      this.getMenuEntity()
    })
  },
  methods: {
    handClose: function() {
      this.$emit('update:is-visible', false)
    },
    Submit: function() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          submitMenu(this.entity)
            .then(res => {
              if (res.result) {
                this.$emit('update:is-visible', false)
                this.$emit('reload')
              }
            })
            .catch(() => {
              this.$alter('请求错误')
            })
        } else {
          return false
        }
      })
    },
    async getParentMenuList() {
      var { data, msg, result } = await getParentMenuList()
      if (result) {
        this.options = data
      } else {
        this.$alter(msg)
      }
    },
    async getMenuEntity() {
      if (this.primaryKey > 0) {
        const { data, result, msg } = await getMenuEntity(this.primaryKey)
        if (result) {
          this.entity = data
        } else {
          this.$alter(msg)
        }
      }
    }
  }
}
</script>

