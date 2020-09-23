<template>
  <div id="all">
    <Navigator active-func="home" />
    <div id="main">
      <div id="top">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-carousel
              id="carouselImg"
              height="222px"
              class="con-block"
              :interval="3000"
            >
              <el-carousel-item v-for="item in 4" :key="item">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="centerLogo"
                  fit="contain"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="5" id="latest">
            <div
              class="con-block selfBlock"
              style="padding-bottom: 12px"
              v-if="this.$store.state.userId == -1"
            >
              <div class="username">暂未登录</div>
            </div>
            <div
              class="con-block selfBlock"
              v-if="this.$store.state.userId != -1"
            >
              <div class="username">
                {{ username }}
                <!-- <Username v-if="$store.state.teacherID != 2" :name="username" text="教师" type="1" />
                <Username v-if="$store.state.teacherID == 2" :name="username" text="" type="1" />-->
              </div>
              <div id="tip">最近创建的BOT</div>
              <div
                v-if="!haveBot"
                class="bots"
                style="padding-bottom: 10px; cursor: default"
              >
                暂未创建机器人
              </div>
              <div v-if="haveBot">
                <div
                  class="bots"
                  v-for="(bot, index) in my_bot_list"
                  :key="index"
                  @click="toBot(bot.botId)"
                >
                  <span>{{ bot.botName + "-" }}</span>
                  <span v-if="bot.botType == 1">私聊BOT</span>
                  <span v-if="bot.botType == 2">群聊BOT</span>
                  <span v-if="bot.botType == 3">代码检查BOT</span>
                </div>
                <div
                  v-if="this.my_bot_list_all.length > 3"
                  class="bots"
                  style="font-size: 14px; color: gray"
                  @click="FT.toPath('/user/' + $store.state.userId)"
                >
                  更多......
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18" class="divideBar">
          <el-image class="barImg" :src="simpleLogo" fit="contain" />
          <div class="barCon">选择你的BOT，开启新的生活</div>
        </el-col>
      </el-row>

      <div id="medium">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-card>
              <div slot="header">
                <span>最新BOT</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="getNewBot('f5')"
                  >刷新</el-button
                >
              </div>
              <el-row class="hotBotCon" justify="space-around">
                <el-col :span="6" v-for="(bot, index) in bot_list" :key="index">
                  <div class="botCard">
                    <el-row style="margin: 0">
                      <el-col>
                        <el-row style="margin-top: 5px; margin-bottom: 7px">
                          <el-link
                            type="primary"
                            :underline="false"
                            style="font-size: 20px"
                            @click="FT.toPath('/bot/' + bot.botId)"
                            >{{ bot.botName }}</el-link
                          >
                        </el-row>
                        <el-row v-if="bot.botType == 1">类型：私聊BOT</el-row>
                        <el-row v-if="bot.botType == 2">类型：群聊BOT</el-row>
                        <el-row v-if="bot.botType == 3"
                          >类型：代码检查BOT</el-row
                        >
                        <el-row style="margin-top: 3px"
                          >创建者：{{ bot.botOwner.userName }}</el-row
                        >
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div id="bottom">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-card>
              <div slot="header">
                <span>热门类型</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="FT.building"
                  >刷新</el-button
                >
              </div>
              <el-row class="hotBotCon" justify="space-around">
                <el-col :span="2">
                  <el-tag
                    class="hotTag"
                    @click="FT.building"
                    effect="plain"
                    type="primary"
                    >私聊BOT</el-tag
                  >
                </el-col>
                <el-col :span="2">
                  <el-tag
                    class="hotTag"
                    @click="FT.building"
                    effect="plain"
                    type="primary"
                    >群聊BOT</el-tag
                  >
                </el-col>
                <el-col :span="2">
                  <el-tag
                    class="hotTag"
                    @click="FT.building"
                    effect="plain"
                    type="primary"
                    >代码检查BOT</el-tag
                  >
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
  name: "Home",
  components: {
    Navigator,
    Footer,
  },
  data() {
    return {
      FT,
      haveBot: false,
      centerLogo: require("@/assets/ucloud-horizon-complex.png"),
      simpleLogo: require("@/assets/ucloud-horizon-simple.png"),
      username: "加载中",
      bot_list_all: [],
      bot_list: [
        {
          botId: 1,
          botName: "botname",
          botType: 1,
          botOwner: {
            userName: "aaaaaaaaaa",
          },
        },
        {
          botId: 1,
          botName: "botname",
          botType: 2,
          botOwner: {
            userName: "aaaaaaaaaa",
          },
        },
        {
          botId: 1,
          botName: "botname",
          botType: 1,
          botOwner: {
            userName: "aaaaaaaaaa",
          },
        },
        {
          botId: 1,
          botName: "botname",
          botType: 1,
          botOwner: {
            userName: "aaaaaaaaaa",
          },
        },
      ],
      my_bot_list: [],
      my_bot_list_all: [],
    };
  },
  async created() {
    // 填充旧数据
    let oldUI = JSON.parse(localStorage.getItem("userInfo"));
    if (oldUI) {
      this.$store.state.username = oldUI.username;
      this.$store.state.userId = oldUI.userId;
      this.username = this.$store.state.username;
      await this.getMyBot();
    }
    await this.getNewBot();
  },
  methods: {
    toBot(botId) {
      FT.toPath("/bot/" + botId);
    },
    async getMyBot() {
      let res = await UserAPI.getUserInfo(this.$store.state.userId);
      console.log(res);
      if (res.data.success) {
        this.haveBot = true;
        this.my_bot_list_all = res.data.data;
        this.my_bot_list_all.reverse();
        for (let i = 0; i < 3 && i < this.my_bot_list_all.length; i++) {
          this.my_bot_list.push(this.my_bot_list_all[i]);
        }
      } else {
        this.haveBot = false;
      }
    },
    async getNewBot(type) {
      let res = await BotAPI.getAllBot();
      if (res.data.success) {
        this.bot_list = [];
        this.bot_list_all = res.data.data;
        this.bot_list_all.reverse();
        for (let i = 0; i < 4 && i < this.bot_list_all.length; i++) {
          this.bot_list.push(this.bot_list_all[i]);
        }
      }
      if (type == "f5") {
        this.$message.success("最新BOT已刷新");
      }
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
  padding-top: 70px;
  width: 100%;
  clear: both;
}
.con-block {
  border-radius: 5px;
  background-color: white;
}
.selfBlock {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}
.username {
  width: 100%;
  padding-top: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
#tip {
  margin-top: 10px;
  margin-left: 15px;
  font-size: 13px;
  color: #797b80;
}
.bots {
  cursor: pointer;
  margin-top: 7px;
  margin-left: 15px;
  font-size: 14px;
}
#carouselImg {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-carousel__item:nth-child(2n) {
  background-color: rgba(0, 81, 255, 0.541);
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: rgba(70, 172, 255, 0.5);
}

.divideBar {
  height: 60px;
  padding-top: 5px;
  margin-top: 10px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.barImg {
  float: left;
  height: 50px;
  width: 150px;
}
.barCon {
  float: left;
  height: 50px;
  width: 460px;
  text-align: center;
  margin-left: calc(37vw - 380px);
  letter-spacing: 3px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
}

#medium {
  margin-top: 10px;
}
.hotBotCon {
  height: auto;
}
.botCard {
  width: 80%;
  margin-left: 10%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(128, 128, 128);
  margin-bottom: 20px;
}
.botCard .el-row {
  font-size: 15px;
}
.hotTag {
  cursor: pointer;
}
#bottom {
  margin-top: 10px;
}
</style>