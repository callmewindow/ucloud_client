<template>
  <div id="navigator">
    <el-menu
      id="menu"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item @click="FT.toPath('/home')">
        <el-image
          style="height: 50px; width: 50px; margin: auto; margin-left: 130px"
          :src="wel"
        />
      </el-menu-item>
      <el-menu-item
        class="nav-text"
        @click="FT.toPath('/botList')"
        index="robot"
        >机器人列表</el-menu-item
      >
      <el-menu-item class="nav-text" @click="FT.building" index="college"
        >热门</el-menu-item
      >
      <el-menu-item class="nav-text" @click="FT.building" index="forum"
        >社区</el-menu-item
      >

      <el-menu-item
        style="float: right; margin-right: 100px"
        @click="toUser"
        index="user"
      >
        <i class="el-icon-user"></i>
      </el-menu-item>
    </el-menu>

    <el-card
      header="加入大云平台"
      shadow="never"
      id="loginWin"
      v-if="loginShow === 'yes'"
    >
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
      wel: require("@/assets/ucloud-logo.png"),
      activeIndex: this.activeFunc,
      now: this.activeFunc,
      loginShow: this.login,
    };
  },
  methods: {
    toUser() {
      if (this.$store.state.userId === -1) {
        this.$message("请登录后查看更多内容");
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
  margin-left: 20px;
}
</style>
