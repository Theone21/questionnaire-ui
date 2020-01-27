<template>
  <vxe-table
      border
      :span-method="rowspanMethod"
      :data="tableData">
      <vxe-table-column field="name_1" title="功能模块">
        <template v-slot="{ row }">
          <vxe-checkbox v-model="row.check_1" @change="check1ChangeEvent(row)">{{ row.name_1 }}</vxe-checkbox>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name_2" title="详细功能">
        <template v-slot="{ row }">
          <vxe-checkbox v-model="row.check_2" @change="check2ChangeEvent(row)" v-if="!!row.name_2">{{ row.name_2 }}</vxe-checkbox>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name_3" title="按钮权限">
        <template v-slot="{ row }">
          <vxe-checkbox v-model="row.check_3" v-if="!!row.name_3">{{ row.name_3 }}</vxe-checkbox>
          <el-button @click="deleteFunction(row.id_3)" v-if="showDelBtn && row.name_3">删除该权限</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
</template>

<script>
import XEUtils from 'xe-utils'
import {get, post} from '@/api/request'
export default {
  name: 'functionTable',
  props: {
    showDelBtn: Boolean
  },
  data(){
    return {
      tableData: []
    };
  },
  created() {
    this.getFunctionAndDetailAndButton();
  },
  methods: {
    check1ChangeEvent (row) {
      let checked = row.check_1;
      let levelList = this.tableData.filter(item => item.id_1 === row.id_1);
      levelList.forEach(item => {
        item.check_2 = checked;
      })
    },
    check2ChangeEvent (row) {
      let levelList = this.tableData.filter(item => item.id_1 === row.id_1)
      let checked = levelList.some(item => item.check_2)
      levelList.forEach(item => {
        item.check_1 = checked
      })
      
    },
    getFunctionAndDetailAndButton(){
      get('/function/getFunctionAndDetailAndButton', {})
        .then((res) => {
          if (res.code == 200) {
            this.functionAndDetailAndButton = res.data;
            this.toColTreeData();
          }
        })
    },
    // 转换横向树结构
    toColTreeData () {
      let options = { children: 'children' }
      let list = []
      let keyMap = {}
      XEUtils.eachTree(this.functionAndDetailAndButton, (item, index, result, paths, parent) => {
        keyMap[item.value] = item
        item.keys = parent ? parent.keys.concat([item.value]) : [item.value]
        if (!item.children || !item.children.length) {
          let row = { }
          item.keys.forEach((key, index) => {
            let level = index + 1
            let obj = keyMap[key]
            row[`check_${level}`] = false
            row[`id_${level}`] = obj.value
            row[`name_${level}`] = obj.label
          })
          list.push(row)
        }
      }, options)
      this.keyMap = keyMap
      this.tableData = list
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, $rowIndex, column, data }) {
      let fields = ['name_1', 'name_2']
      let cellValue = XEUtils.get(row, column.property)
      if (cellValue && fields.includes(column.property)) {
        let prevRow = data[$rowIndex - 1]
        let nextRow = data[$rowIndex + 1]
        if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && XEUtils.get(nextRow, column.property) === cellValue) {
            nextRow = data[++countRowspan + $rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    deleteFunction(functionId){
      post('/function/deleteFunction', {
        functionId: functionId
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success('删除权限成功');
          this.getFunctionAndDetailAndButton();
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>