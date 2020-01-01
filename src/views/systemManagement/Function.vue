<template>
  <div class="function">
    <vxe-grid
      border
      resizable
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
  </div>
</template>

<script>
import {get, post} from '@/api/request'
import axios from 'axios'
export default {
  name: 'function',
  data() {
    return {
      tablePage: {
        pageSize: 5
      },
      tableProxy: {
        // 配置响应的数据属性
        props: {
          result: 'data',
          total: 'count'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => get('/sys/getFunctionList', page), // 模拟请求
          // body 对象： { removeRecords }
          delete: ({ body }) => axios.post('/sys/delFunction', body.removeRecords),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => {
            return post('/sys/addFunction', body.insertRecords.length > 0 ? body.insertRecords[0] : body.updateRecords[0]);
          }
        }
      },
      tableToolbar: {
        id: "test",
        buttons: [
          { id: 1, code: 'insert_actived', name: '新增权限' },
          { id: 2, code: 'delete', name: '删除权限' },
          { id: 3, code: 'save', name: '保存权限' },
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
        { field: 'functionName', title: '权限名称', editRender: { name: 'input' } },
        {field: 'functionCode', title: '权限编码', editRender: { name: 'input' }}
      ]
    };
  }
  
}
</script>

<style scoped lang="less">

</style>