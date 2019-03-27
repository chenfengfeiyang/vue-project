<template>
  <!--<div>首页</div>-->
  <el-card class="box-card">
    <div  class="text item">
      <p>账号ID：{{ userinfo.id }}</p>
      <p>账号：{{ userinfo.username }}</p>
      <p>密码：{{ userinfo.password }}</p>
      <p>年龄：{{ userinfo.age }}</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="dataDel(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button @click="dataEdit(scope.row.id)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';

    export default {
        name: "home",
        data() {
          return {
            tableData: [{
              id: this.$store.state.userinfo.id,
              username: 'admin',
              password: 'admin',
              age: '20'
            }]
          }
        },
        methods:{
          dataDel (id) {
            console.log(id);
            // console.log(this.$store.state.username)
          },
          dataEdit (id){
            console.log("asdf"+id);
          }
        },
        computed : {
          //获取用户信息的一种写法  一般用 ...mapState
          // userinfo () {
          //   return this.$store.state.userinfo
          // },
          // username () {
          //   return this.$store.state.userinfo.username
          // },

          //辅助函数 获取state数据
          ...mapState({
            userinfo : state => state.userinfo,
            username : state => state.userinfo.username
          })
        }


    }

</script>

<style scoped>

</style>
