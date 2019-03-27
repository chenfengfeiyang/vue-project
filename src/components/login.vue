<template>
  <div class="login">
    <el-form :model="loginform" status-icon :rules="rules" ref="loginform" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginform')">提交</el-button>
        <el-button @click="resetForm('loginform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginform: {
                  username: '',
                  password: ''
                },
                rules: {
                  username:[
                    { required: true, message: '输入账号', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                  ],
                  password:[
                    { required: true, message: '输入账号', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                  ]
                }
            };
        },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              //axios挂载在Vue原型上可全局拿到
              //console.log(this.axios);
              let _this = this;
              this.axios.post('/api/login',{
                username : _this.loginform.username,
                password : _this.loginform.password
              }).then(response => {
                if(response.data.length){
                  console.log(`后端返回结果`,response.data);
                  //把当前用户数据存入本地存储
                  // localStorage.setItem('userinfo',JSON.stringify(response.data[0]));
                  // let userinfo = JSON.parse(localStorage.getItem('userinfo'));

                  //把当前用户数据存入state
                  _this.$store.commit('SAVE_USERINFO',response.data[0]);
                  _this.$message({
                    message:'登陆成功',
                    type:'success'
                  });
                  _this.$router.push('/');
                }else{
                  _this.$message.error('登陆失败');
                }

              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }

    }
</script>

<style scoped>

</style>
