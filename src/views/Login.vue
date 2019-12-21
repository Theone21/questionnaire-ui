<template>
  <div class="login-container">
    <div class="bg"></div>
    <div class="login">
      <div class="form-box">
        <h3 class="h3">调查问卷后台登录</h3>
        <el-form :model="ruleForm" :rules="rules" ref="userPassForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('userPassForm')" type="primary">登录</el-button>
            <el-button @click="resetForm('userPassForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        ruleForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '用户名必须填写', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码必须填写', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            alert('成功');
          } else {
            return false;
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">
  .login-container{
    display: table;
    height: 100%;
    width: 100%;
    position: fixed;
    margin: 0;
    padding: 0;
    .bg{
      background: url("../assets/images/login-bg.png") no-repeat;
      background-size: cover;
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: -1;
    }
    .login{
      display: table-cell;
      vertical-align: middle;
      .form-box{
        width: 500px;
        margin: 0 auto;
        padding: 0 50px 0 0;
        background-color: #ffffff1f;
        h3{
          line-height: 60px;
          font-size: 16px;
          padding-left: 100px;
        }
      }
    }
  }
</style>
