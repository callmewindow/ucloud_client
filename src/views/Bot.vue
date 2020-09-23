<template>
  <div id="all">
    <Navigator active-func="home" />
    <div id="main">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="16">
          <el-row id="up_part">
            <el-col :span="4">
              <el-card id="up_left_part">小冰</el-card>
            </el-col>

            <el-col :span="20">
              <el-card id="up_right_part">
                <div id="course_name">群聊机器人</div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row id="down_part" type="flex" class="row-bg" justify="center">
        <el-col :span="16">
          <el-card id="down_card">
            <el-tabs v-model="tabPos" tab-position="left" @tab-click="clickCommunity">
              <el-tab-pane :name="tabNames[0]">
                <div class="tab_left_part" slot="label">课程信息</div>
                <el-card class="tab_right_body">
                  123
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[1]">
                <div class="tab_left_part" slot="label">课程直播</div>
                <el-card class="tab_right_body">
                  <span style="color: #303133; font-size: 18px; float: left;">功能开发中，敬请期待</span>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[3]">
                <div class="tab_left_part" slot="label">圈子社区</div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <Footer position="center" />
  </div>
</template>

<script>
import * as FT from "@/tools/frontTool";
import * as UserAPI from "@/APIs/user.js";
import * as BotAPI from "@/APIs/bot.js";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
export default {
  name: "Bot",
  components: {
    Navigator,
    Footer,
  },
  data() {
    return {
      FT,
      tabPos: "intro",
      tabNames: ["intro", "direct", "video", "forum"],
    };
  },
  async created() {},
  methods: {
    clickCommunity(target) {
      console.log(target);
      // // 切换路由
      // let toPath = "/bot/" + this.$route.params.botId + "/" + target.name;
      // // 当路由需要切换时才切换
      // if (toPath !== this.$route.path) {
      //   this.$router.push({
      //     path: "/bot/" + this.$route.params.botId + "/" + target.name,
      //   });
      // }
    },
  },
};
</script>

<style scoped>
#all {
  width: 100%;
  min-height: 100vh;
}
#main {
  padding-top: 60px;
}

#up_part {
  padding-top: 5px;
}
#up_left_part {
  margin-right: 5px;
  height: 45px;
  background-color: #409eff;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#up_right_part {
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#course_name {
  font-size: 15px;
  padding-right: 15px;
  color: #409eff;
}

#down_part {
  /* min-height: 800px; */
  margin-top: 5px;
  padding-bottom: 20px;
}
#down_card {
  padding-bottom: 20px;
}
.tab_left_part {
  min-width: 5vw;
  text-align: center;
  font-size: 16px;
}
.tab_right_title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
  color: #303133;
}
.tab_right_body {
  width: 80%;
  min-height: 600px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10px;
  font-size: 18px;
  border-bottom: 1px solid rgba(175, 172, 172, 0.699);
}
</style>