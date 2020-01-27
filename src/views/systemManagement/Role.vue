<template>
  <div class="role">
    <vxe-grid
      border
      resizable
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

    <el-dialog
      title="请为该角色设置权限"
      :visible.sync="dialogVisible"
      >
      <div>
        <FunctionTable ref="functionTable" :showDelBtn="false"></FunctionTable>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindRoleAndFunction">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {post} from '@/api/request'
import axios from 'axios'
import FunctionTable from "@/components/FunctionTable";
export default {
  name: 'role',
  components: {
    FunctionTable
  },
  data(){
    return {
      dialogVisible: false,
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
          query: ({ page }) => axios.get('/role/roleList', {
            params: page
          }), // 模拟请求
          // body 对象： { removeRecords }
          delete: ({ body }) => axios.post('/role/delRole', body.removeRecords),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => {
            return post('/role/insertRole', body.insertRecords.length > 0 ? body.insertRecords[0] : body.updateRecords[0]);
          }
        }
      },
      tableToolbar: {
        id: "test",
        buttons: [
          { id: 1, code: 'insert_actived', name: '新增角色' },
          { id: 2, code: 'delete', name: '删除角色' },
          { id: 3, code: 'save', name: '保存角色' },
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
        { field: 'roleName', title: '角色名', editRender: { name: 'input' } },
        { field: 'roleCode', title: '角色编号', editRender: { name: 'input' } },
        { field: 'operator', title: '操作', slots: {
          default: ({row, column}) => {
            return [
              <el-button onClick={ () => this.openSetFuntionDialog(row, column) } type="primary" size="mini">设置权限</el-button>
            ]
          }
        }}
      ]
    };
  },
  methods: {
    openSetFuntionDialog(row) {
      
      this.dialogVisible = true;
      this.selectedRoleId = row.roleId;
    },
    bindRoleAndFunction() {
      let functionIds = [];
      this.$refs['functionTable'].tableData.forEach(element => {
        [1, 2, 3].forEach(item => {
          if(element['check_' + item] && element['id_' + item] && functionIds.indexOf(element['id_' + item]) == -1){
            functionIds.push(element['id_' + item]);
          }
        })
      });
      post('/role/bindRoleAndFunction', {
        functionIds: JSON.stringify(functionIds),
        roleId: this.selectedRoleId
      }).then((res) => {
        if(res.code == 200){
          this.$message.success('设置权限成功');
          this.dialogVisible = false;
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>