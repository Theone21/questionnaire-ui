<template>
  <div class="home">
    <el-container style=" border: 1px solid #eee" :direction="'horizontal'">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>系统管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="goPage('/systemManagement/user')">用户管理</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
              <el-menu-item index="1-3">权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>报表管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">编辑报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  components: {

  },
  methods: {
    goPage(url){
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
