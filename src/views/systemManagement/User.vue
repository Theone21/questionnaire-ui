<template>
  <div class="user">

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

      <el-dialog
        title="设置用户的角色"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="roles">
          <template>
            <el-checkbox-group v-model="selectedRoleList">
              <el-checkbox :label="role.roleId" v-for="role in roles" :key="role.roleId" :value="role.value">{{role.roleName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitSetUserRoles">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {addUser} from '@/api/api'
import {post, get} from '@/api/request'
import axios from 'axios';
export default {
  name: 'user',
  data(){
    return {
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        // 配置响应的数据属性
        props: {
          result: 'data.data',
          total: 'data.count'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => axios.get('/sys/list', {
            params: page
          }), // 模拟请求
          // body 对象： { removeRecords }
          delete: ({ body }) => axios.post('/sys/delUser', body.removeRecords),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => {
            return post('/sys/addUser', body.insertRecords.length > 0 ? body.insertRecords[0] : body.updateRecords[0]);
          }
        }
      },
      tableToolbar: {
        id: "test",
        buttons: [
          { id: 1, code: 'insert_actived', name: '新增用户' },
          { id: 2, code: 'delete', name: '删除用户' },
          { id: 3, code: 'save', name: '保存用户' },
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
        { type: 'seq', width: 60, title: '序号' },
        { field: 'userName', title: '用户名', editRender: { name: 'input' } },
        { field: 'userPassword', title: '密码', editRender: { name: 'input' } },
        { field: 'operator', title: '操作', slots: {
          default: ({row, column}) => {
            return [
              <el-button onClick={ () => this.setUserRoles(row, column) } type="primary" size="mini">设置角色</el-button>
            ]
          }
        }}
      ],
      dialogVisible: false,
      selectedRoleList: [],
      roles: [],
      selectedUserId: -1
    }
  },
  created() {
    this.getAllRoles();
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
    },
    getAllRoles() {
      get('/role/getAllRoles', {}).then((res) => {
        if(res.code == 200){
          this.roles = res.data;
        }
      })
    },
    setUserRoles(row){
      this.selectedUserId = row.userId;
      get('/role/getUserRoes', {
        userId: this.selectedUserId
      }).then((res) => {
        if(res.code == 200){
          this.selectedRoleList = res.data.map((role) => role.roleId);
          this.dialogVisible = true;
        }
        
      })
      
      
    },
    submitSetUserRoles() {
      post('/role/setUserRoles', {
        userId: this.selectedUserId,
        roles: JSON.stringify(this.selectedRoleList)
      }).then((res) => {
        if(res.code == 200){
          this.$message('设置角色成功');
          this.dialogVisible = false;
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
