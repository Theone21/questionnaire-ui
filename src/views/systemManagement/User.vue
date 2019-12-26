<template>
  <div class="user">
    <el-row>
      <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    </el-row>
    
    <vxe-grid
      border
      resizable
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

    <el-dialog :title="'添加用户'" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.userName" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addUser} from '@/api/api'
import axios from 'axios';
export default {
  name: 'user',
  data(){
    return {
      formLabelWidth: "120px",
      user: {
        userName: ""
      },
      dialogFormVisible: false,
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        // 配置响应的数据属性
        // props: {
        //   result: 'records',
        //   total: 'size'
        // },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => axios.get('/sys/list', {
            params: page
          }), // 模拟请求
          // body 对象： { removeRecords }
          delete: ({ body }) => axios.post('/api/user/save', body),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => axios.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        id: "test",
        buttons: [
          { id: 1, code: 'insert_actived', name: '新增' },
          { id: 2, code: 'remove_selection', name: '移除数据' },
          { id: 3, code: 'save', name: '保存' },
          { id: 4, code: 'myBtn', name: '自定义按钮' }
        ],
        refresh: true, // 刷新按钮
        import: true, // 导入按钮
        export: true, // 导出按钮
        zoom: true, // 最大化按钮
        // 列宽操作记录
        resizable: {
          storage: true
        },
        // 列操作记录
        custom: {
          storage: true
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'userName', title: '用户名', editRender: { name: 'input' } }
      ]
    }
  },
  methods: {
    submitAddUser(){
      addUser(this.user).then(res => {
        if(res.code == 200){
          this.$message('添加用户成功');
        }
      })
    },
    toolbarButtonClickEvent ({ code }) {
      switch (code) {
        case 'myBtn':
          this.$XModal.alert(code)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>