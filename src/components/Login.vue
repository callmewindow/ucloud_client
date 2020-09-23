<template>
  <el-card>
    <el-tabs :stretch="true" v-model="pos">
      <el-tab-pane label="登录" name="login">
        <el-form class="login-container" ref="login" :model="login">
          <h1 class="title"></h1>
          <el-form-item label>
            <el-input v-model="login.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="login.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="doSubmitLogin()">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form
          class="register-container"
          ref="register"
          :model="register"
          :rules="rules"
          label-width="80px"
        >
          <h1 class="title"></h1>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="register.checkPass" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSubmitRegister('register')">立即注册</el-button>
            <el-button @click="resetForm('register')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import * as userAPI from "@/APIs/user";

export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码格式错误：长度须大于6位"));
      } else {
        if (/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value) == false) {
          return callback(new Error("密码格式错误：必须同时包含字母和数字"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      pos: "login",
      login: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        password: "",
        checkPass: "",
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async doSubmitLogin() {
      try {
        const lr = await userAPI.login(
          this.login.username,
          this.login.password
        );
        if (lr.data.success) {
          let userInfo = lr.data.data;
          this.$store.state.userId = userInfo.id;
          this.$store.state.username = userInfo.username;
          localStorage.setItem("userInfo", JSON.stringify(this.$store.state));
          this.$message.success("登录成功，一秒后跳转到个人页面")
          setTimeout(() => {
            this.$router.push({ path: "/user/" + this.$store.state.userId });
          }, 1000);
        }else{
          this.$message.error(lr.data.message);
        }
      } catch (e) {
        this.$message.error(e.toString());
      }
    },
    async doSubmitRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const rr = await userAPI.register(
              this.register.username,
              this.register.password
            );
            if (rr.data.success) {
              this.$message.success("注册成功，欢迎加入大云平台！");
              this.pos = "login";
              this.login.username = this.register.username;
              this.login.password = this.register.password;
            } else {
              this.$message.error(rr.data.message);
            }
          } catch (e) {
            this.$message.error("未知错误：" + e.toString());
          }
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
}
.register-container {
  margin: 0 auto;
}
</style>
