<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="ID" width="140">
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="password" label="密码">
    </el-table-column>
    <el-table-column prop="age" label="年龄">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" @click="userListEdit(scope.row.id)" size="small">编辑</el-button>
        <el-button type="text" @click="userListDel(scope.row.id)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        name: "userList",
        data() {
          /*const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          };*/
          return {
            tableData: []
          }
        },
        created(){
          //下面这段代码 手动触发了actions  GET_USERLIST方法 可用mapAction改写
          // this.$store.dispatch('GET_USERLIST').then(() => {
          //   this.tableData = this.userlist;
          // });

          //下面代码我理解是调用了methods里面的 mapActions 触发方法 (数组方式)
          // this.GET_USERLIST().then(()=>{
          //   this.tableData = this.userlist;
          // })

          //对象方式
          this.getUserList().then(()=>{
            this.tableData = this.userlist   //此处userlist 和 store 里面 state.userlist 映射关系
          })
        },
        methods:{
          //mapActions触发 //数组方式
          //...mapActions(['GET_USERLIST']),  改写为下面对象方式更好理解

          //对象方式
          ...mapActions({
            getUserList : 'GET_USERLIST'
          }),
          userListEdit(id){
            console.log('1'+id);
          },
          userListDel(id){
            console.log('2'+id);
          }
        },
        computed:{
          ...mapState({
            userlist:state => state.userlist,
            // userlist : function (state) {
            //   return state.userlist
            // }
          })
        }
    }
</script>

<style scoped>

</style>
