<template>
  <div id="CL">
    <Navigator active-func="robot" />
    <el-row :gutter="20" style="margin-left: 15%; margin-right: 15%">
      <el-col
        :span="3"
        style="margin-top: 90px; float: left; margin-left: -10px"
      >
        <el-button
          type="primary"
          style="float: right"
          @click="showAddBot = true"
        >
          创建BOT
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="margin-left: 15%; margin-right: 15%; padding-bottom: 50px"
    >
      <el-col
        :span="8"
        v-for="(bot, index) in bot_list"
        :key="index"
        style="margin-top: 20px"
      >
        <el-card>
          <el-row style="margin: 0">
            <el-col :span="8">
              <img src="@/assets/ucloud-logo-mini.png" style="float: left" />
            </el-col>
            <el-col :span="16" style="font-size: 15px">
              <el-row style="margin-top: 5px; margin-bottom: 15px">
                <el-link
                  type="primary"
                  :underline="false"
                  style="font-size: 20px"
                  @click="frontTool.toPath('/bot/' + bot.botId)"
                  >{{ bot.botName }}
                </el-link>
              </el-row>
              <el-row v-if="bot.botType === 1"> 类型：私聊BOT </el-row>
              <el-row v-if="bot.botType === 2"> 类型：群聊BOT </el-row>
              <el-row v-if="bot.botType === 3"> 类型：代码检查BOT </el-row>
              <el-row style="margin-top: 10px">
                创建者：{{ bot.botOwner.userName }}
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showAddBot" width="30%">
      <div id="sendPA">
        <div class="sendItem">
          <div class="itemTitle"><span style="color: red">*</span>BOT名称</div>
          <el-input
            v-model="new_bot.botName"
            placeholder="请输入名称"
            maxlength="30"
            show-word-limit
          ></el-input>
        </div>
        <div class="sendItem">
          <div class="itemTitle"><span style="color: red">*</span>QQ</div>
          <el-input v-model="new_bot.botQQ" placeholder="请输入QQ"></el-input>
        </div>
        <div class="sendItem">
          <div class="itemTitle"><span style="color: red">*</span>密码</div>
          <el-input
            v-model="new_bot.botPassword"
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div class="sendItem">
          <div class="itemTitle"><span style="color: red">*</span>BOT简介</div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入简介"
            v-model="new_bot.botIntro"
            resize="none"
            maxlength="500"
            show-word-limit
          ></el-input>
        </div>
        <div class="sendItem" style="width: 50%">
          <div class="itemTitle"><span style="color: red">*</span>BOT类型</div>
          <el-select v-model="new_bot.botType" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button id="sendBtn" type="primary" size="small" @click="create_bot">
          创建
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import * as frontTool from "@/tools/frontTool";
import * as botAPI from "@/APIs/bot";

export default {
  name: "BotList",
  components: {
    Navigator,
  },
  data() {
    return {
      frontTool,
      showAddBot: false,
      bot_list: [],
      new_bot: {
        botName: "",
        botType: 1,
        botIntro: "",
        botQQ: "",
        botPassword: "",
        botOwner: {
          userName: "大云内测用户",
        },
      },
      options: [
        {
          value: 1,
          label: "私聊BOT",
        },
        {
          value: 2,
          label: "群聊BOT",
        },
      ],
    };
  },
  created() {
    // 填充旧数据
    // let oldUI = JSON.parse(localStorage.getItem("userInfo"));
    let oldUI = this.$store.state;
    if (oldUI) {
      this.$store.state.username = oldUI.username;
      this.$store.state.userId = oldUI.userId;
    }
    this.get_all_bot();
  },
  filters: {
    cut(str) {
      if (str) str = str.slice(0, 10);
      return str;
    },
    cut_8(str) {
      if (str && str.length > 8) str = str.slice(0, 8) + "...";
      return str;
    },
  },
  methods: {
    async get_all_bot() {
      this.bot_list = [
        {
          botId: 1,
          botName: "孤寡青蛙",
          botType: 1,
          botOwner: {
            userName: "大云内测用户",
          },
        },
        {
          botId: 2,
          botName: "提醒喝水小助手",
          botType: 2,
          botOwner: {
            userName: "大云内测用户",
          },
        },
        {
          botId: 3,
          botName: "Steam游戏资讯",
          botType: 1,
          botOwner: {
            userName: "大云内测用户",
          },
        },
      ];
      return;
      try {
        const list = await botAPI.getAllBot();
        //window.console.log(list.data.data);
        if (list.data.success) {
          this.bot_list = list.data.data;
        } else {
          this.$message.error("请求错误");
        }
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async create_bot() {
      if (
        this.new_bot.botName === "" ||
        this.new_bot.botIntro === "" ||
        this.new_bot.botQQ === "" ||
        this.new_bot.botPassword === ""
      ) {
        this.$message.error("必填字段未填写");
        return;
      }
      this.bot_list.push(this.new_bot);
      this.showAddBot = false
      return;
      try {
        const res = await botAPI.createBot(
          this.new_bot.botName,
          this.new_bot.botIntro,
          this.new_bot.botQQ,
          this.new_bot.botPassword,
          this.new_bot.botType,
          this.$store.state.userId
        );
        //window.console.log(res.data);
        if (res.data.success) {
          this.$message.success("创建成功，跳转至详情页");
          await this.$router.push({ path: "/bot/" + res.data.data.botId });
        } else {
          this.$message.error("bot重名");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#CL {
  min-height: 100vh;
}

.sendItem {
  width: 100%;
  margin: 20px 0;
}

.sendItem:nth-child(1) {
  margin-top: 0;
}

.itemTitle {
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
}
</style>