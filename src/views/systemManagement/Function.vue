<template>
  <div class="function">
    <div class="tool-box">
      <el-button type="primary" @click="dialogFunctionVisible = true;">添加权限</el-button>
    </div>

    <FunctionTable ref="functionTable" :showDelBtn="true"></FunctionTable>

    <el-dialog title="新增权限" :visible.sync="dialogFunctionVisible" width="500px">
      <el-form :model="functionData" :rules="functionDataRules" ref="functionForm">
        <el-form-item label="权限类型" :label-width="formLabelWidth" prop="functionType">
          <el-radio-group v-model="functionData.functionType">
            <el-radio :label="0">功能模块</el-radio>
            <el-radio :label="1">详细功能</el-radio>
            <el-radio :label="2">操作权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能模块" :label-width="formLabelWidth" prop="functionParentId" v-if="functionData.functionType == 1">
          <el-select v-model="functionData.functionParentId" placeholder="请选择">
            <el-option
              v-for="item in functions"
              :key="item.functionId"
              :label="item.functionName"
              :value="item.functionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细功能" :label-width="formLabelWidth" v-if="functionData.functionType == 2">
          <el-cascader
            v-model="detailFunction"
            :options="functionAndDetails"></el-cascader>
        </el-form-item>
        <el-form-item label="权限名称" :label-width="formLabelWidth" prop="functionName">
          <el-input v-model="functionData.functionName" autocomplete="off" autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" :label-width="formLabelWidth" prop="functionCode">
          <el-input v-model="functionData.functionCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFunctionVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFunction">确 定</el-button>
      </div>
    </el-dialog>

    
      
  </div>
</template>

<script>

import {get, post} from '@/api/request'
import FunctionTable from "@/components/FunctionTable";
// import axios from 'axios'
export default {
  name: 'function',
  components: {
    FunctionTable
  },
  data() {
    return {
      dialogFunctionVisible: false,
      formLabelWidth: '120px',
      functionData: {
        functionName: '',
        functionCode: '',
        functionType: 0,
        functionParentId: ''
      },
      functionDataRules: {
        functionName: [
          {required: true, message: '请输入权限名称', trigger: 'blur'}
        ],
        functionCode: [
          {required: true, message: '请输入权限编码', trigger: 'blur'}
        ],
        functionType: [
          {required: true, message: '权限类型必须选择', trigger: 'blur'}
        ],
        functionParentId: [
          {required: true, message: '权限类型必须选择', trigger: 'blur'}
        ]
      },
      functions: [],
      detailFunction: [],
      functionAndDetails: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getAllFunctions();
      this.getFunctionAndDetail();
    },
    getAllFunctions() {
      get('/function/getAllFunctions', {
        functionType: 0
      }).then((res) => {
        if (res.code == 200) {
          this.functions = res.data;
        }
      });
    },
    getFunctionAndDetail() {
      get('/function/getFunctionAndDetail', {})
        .then((res) => {
          if (res.code == 200) {
            this.functionAndDetails = res.data;
            if (res.data.length > 0 && res.data[0].children && res.data[0].children.length > 0) {
              this.detailFunction[0] = this.functionAndDetails[0].value;
              this.detailFunction[1] = this.functionAndDetails[0].children[0].value;
            }
          }
        })
    },
    addFunction(){
      this.$refs['functionForm'].validate((valid) => {
        if(valid){
          if (this.functionData.functionType == 2) {
            this.functionData.functionParentId = this.detailFunction[1];
          }
          post('/function/addFunction', this.functionData)
            .then((res) => {
              if (res.code == 200) {
                this.$message.success('新增功能权限成功');
                this.dialogFunctionVisible = false;
                this.$refs['functionForm'].resetFields();
                this.$refs.functionTable.getFunctionAndDetailAndButton();
              }
            })
        }
      })
    }
  }
  
}
</script>

<style scoped lang="less">
.tool-box{
  padding: 5px 10px 5px 0;
  text-align: left;
}
</style>