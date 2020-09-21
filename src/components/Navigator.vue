<template>
  <div id="navigator">
    <el-menu id="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item @click="FT.toPath('/home')">
        <el-image style="height:50px;width:130px;margin:auto;margin-left:100px;" :src="wel" />
      </el-menu-item>
      <el-menu-item
        v-if="login != 'yes'"
        class="nav-text"
        @click="FT.toPath('/courseList')"
        index="course"
      >课程</el-menu-item>
      <el-menu-item v-if="login != 'yes'" class="nav-text" @click="FT.building" index="college">学校</el-menu-item>
      <el-menu-item v-if="login != 'yes'" class="nav-text" @click="FT.building" index="forum">圈子</el-menu-item>

      <el-menu-item
        v-if="login != 'yes'"
        style="float:right;margin-right:100px;"
        @click="toUser"
        index="user"
      >
        <i class="el-icon-user"></i>
      </el-menu-item>
    </el-menu>

    <el-card header="加入烽火平台" shadow="never" id="loginWin" v-if="loginShow === 'yes'">
      <Login />
    </el-card>
  </div>
</template>

<script>
import * as FT from "@/tools/frontTool";
import Login from "@/components/Login";
export default {
  name: "Navigator",
  components: {
    Login,
  },
  props: {
    activeFunc: String,
    login: String,
  },
  data() {
    return {
      FT,
      wel: require("@/assets/logo-horizon-simple.png"),
      activeIndex: this.activeFunc,
      now: this.activeFunc,
      loginShow: this.login,
    };
  },
  methods: {
    toUser() {
      if (this.$store.state.userId === -1) {
        this.$message("请先登录");
        this.$router.push({ path: "/Login" });
      } else {
        this.$router.push({ path: "/user/" + this.$store.state.userId });
      }
    },
  },
};
</script>

<style scoped>
#navigator {
  width: 100%;
  height: auto;
  position: fixed;
  z-index: 10;
}

#menu {
  width: 100%;
  float: left;
}
#loginWin {
  margin: auto;
  max-width: 500px;
}
.nav-text {
  margin-left: 30px;
}
</style>
