<template>
  <!--<div>{{ $store.state.userinfo }}</div>-->
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!--<div class="return-home" index="">首页</div>-->
      <el-menu :default-openeds="['1']" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>操作</template>
          <el-menu-item-group>
            <el-menu-item index="userList">账号列表</el-menu-item>
            <el-menu-item index="userAdd">增加账号</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ username }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    export default {
        name: "index",
        computed : {
          username () {
            return this.$store.state.userinfo.username
          }
        }
    }
</script>

<style scoped>
.return-home{width: 100%; height: 40px; line-height: 40px; cursor: pointer; text-align: center;}
</style>
