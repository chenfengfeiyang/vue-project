<template>
  <div>
    <el-button  @click="dialogFormVisible = true">添加</el-button>
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
          <el-button type="text" @click="userListEdit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="userListDel(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>{{username}}</div>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogFormEdit">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEdit = false">取 消</el-button>
        <el-button type="primary" @click="editBtn(form)">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    import {mapState,mapActions,mapGetters} from 'vuex';
    export default {
      name: "userAdd",
      data(){
        return {
          tableData:[],
          dialogFormVisible: false,
          dialogFormEdit:false,
          form: {
            username: '',
            password:'',
            age: ''
          },
        }
      },
      created(){
        //过滤数据  年龄大于20的数据
        // this.getUserList().then(()=>{
        //   this.newUserList = this.userlist.filter(v => v.age>20);
        //   this.tableData = this.newUserList
        // })

        // this.getUserList().then(() => {
        //   //通过全局的 getters获取数据
        //   // this.tableData = this.$store.getters.oldUser
        //
        //   //通过辅助函数获取
        //   this.tableData = this.allUser;
        // })

        this.showUserData = function () {
          this.getUserList().then(() => {
            //通过全局的 getters获取数据
            // this.tableData = this.$store.getters.oldUser

            //通过辅助函数获取
            this.tableData = this.allUser;
          })
        };
        this.showUserData();

      },
      methods:{
        ...mapActions({
          getUserList:'GET_USERLIST',
          addUserInfo : 'ADD_USERINFO',
          delUserInfo : 'DEL_USERINFO',
          editUserInfo: 'EDIT_USERINFO'
        }),
        userListEdit(row){
          // console.log(id)
          this.dialogFormEdit = true;
          this.form = Object.assign({}, row);
        },
        userListDel(id){
            this.delUserInfo(id).then(() =>{
              this.showUserData();
            })
        },
        userAdd(){

          this.addUserInfo(this.form).then(()=>{
            //走了两次网络请求  添加后再查询
            this.showUserData();

            // this.tableData = this.allUser;
          });
          this.dialogFormVisible = false;
        },
        editBtn(data){
          // console.log(data.id);
          this.editUserInfo(data).then(() => {
            this.showUserData();
            this.dialogFormEdit = false;
          });
        }
      },
      computed:{
        ...mapGetters({
          youngUser :'youngUser',
          oldUser : 'oldUser',
          allUser : 'allUser'
        }),
        ...mapState({
          username:state => state.userinfo.username,
          userlist:state => state.userlist
        })
      }
    }
</script>

<style scoped>

</style>
