<template>
  <div id="all">
    <Navigator active-func="home" />
    <div id="main">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="16">
          <el-row id="up_part">
            <el-col :span="4">
              <el-card id="up_left_part">{{ bot.botName }}</el-card>
            </el-col>

            <el-col :span="20">
              <el-card id="up_right_part">
                <div id="course_name" v-if="bot.botType == 1">私聊机器人</div>
                <div id="course_name" v-if="bot.botType == 2">群聊机器人</div>
                <div id="course_name" v-if="bot.botType == 3">
                  代码检查机器人
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row id="down_part" type="flex" class="row-bg" justify="center">
        <el-col :span="16">
          <el-card id="down_card">
            <el-tabs
              v-model="tabPos"
              tab-position="left"
              @tab-click="clickCommunity"
            >
              <el-tab-pane :name="tabNames[0]">
                <div class="tab_left_part" slot="label">业务代码</div>
                <el-card
                  class="tab_right_body"
                  style="width: 90%; margin-left: 5%"
                >
                  <div slot="header" style="padding-bottom: 10px">
                    <div class="introTitle">/ UCloud / bot.py</div>
                    <template v-if="botOwner">
                      <el-dropdown
                        style="
                          float: right;
                          margin-left: 10px;
                          margin-top: -2px;
                        "
                        @command="handleCommand"
                        trigger="click"
                      >
                        <span class="el-dropdown-link">
                          管理功能
                          <i class="el-icon-cloudy el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="template"
                            >获取模板</el-dropdown-item
                          >
                          <el-dropdown-item command="download"
                            >代码下载</el-dropdown-item
                          >
                          <el-dropdown-item command="check"
                            >代码审查</el-dropdown-item
                          >
                          <el-dropdown-item command="share" disabled
                            >快速分享</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                      <el-button
                        style="float: right; padding: 1px 0; color: #67c23a"
                        type="text"
                        :disabled="disStart"
                        @click="startBot"
                      >
                        运行部署
                        <i
                          v-show="disStart"
                          class="el-icon-loading el-icon--right"
                        ></i>
                      </el-button>
                    </template>
                    <template v-if="!botOwner">
                      <el-button
                        style="float: right; padding: 1px 0; margin-left: 10px"
                        type="text"
                        @click="downloadCode"
                        >代码下载</el-button
                      >
                      <el-button
                        style="float: right; padding: 1px 0; color: #e6a23c"
                        type="text"
                        icon="el-icon-star-off"
                        @click="FT.building"
                      ></el-button>
                    </template>
                  </div>
                  <div class="introBody">
                    <div class="codePart">
                      <div class="introTip">
                        <el-tag
                          type="success"
                          size="small"
                          v-if="bot.botStatus"
                          class="statusTag"
                          >运行中</el-tag
                        >
                        <el-tag
                          type="danger"
                          size="small"
                          v-if="!bot.botStatus"
                          class="statusTag"
                          >未运行</el-tag
                        >
                        BOT部署QQ：{{ bot.botQQ }}—持有者：{{
                          bot.botOwner.userName
                        }}
                      </div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 20 }"
                        placeholder="业务代码为空..."
                        v-model="bot.botCode"
                      ></el-input>
                      <div class="introCon" v-show="!showCheck">
                        {{ bot.botIntro }}
                      </div>
                    </div>
                    <div class="checkPart" v-show="showCheck">
                      <div class="introTip">运行/检查结果</div>
                      <el-input
                        disabled
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 10 }"
                        placeholder="暂无结果"
                        v-model="checkResult"
                      ></el-input>
                    </div>
                  </div>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[1]">
                <div class="tab_left_part" slot="label">提议</div>
                <el-card class="tab_right_body">
                  <div
                    style="
                      color: #303133;
                      font-size: 16px;
                      float: left;
                      padding-bottom: 20px;
                    "
                  >
                    功能开发中，敬请期待
                  </div>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[2]">
                <div class="tab_left_part" slot="label">设置</div>
                <el-card class="tab_right_body">
                  <el-card class="settingCard" shadow="never">
                    <div slot="header" class="settingName">BOT名字</div>
                    <div class="settingBody">
                      <el-input
                        class="settingInput"
                        placeholder="请输入内容"
                        v-model="bot.botName"
                        :disabled="disName"
                      />
                      <el-button
                        type="primary"
                        style="margin-left: 10px"
                        size="small"
                        :disabled="disName"
                        >修改名称</el-button
                      >
                    </div>
                  </el-card>
                  <el-card class="settingCard" shadow="never">
                    <div slot="header" class="settingName">BOT类型</div>
                    <div class="settingBody">
                      <el-select
                        v-model="bot.botType"
                        :disabled="disType"
                        placeholder="请选择类型"
                        style="width: 50%"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-button
                        type="primary"
                        style="margin-left: 10px"
                        size="small"
                        :disabled="disType"
                        >修改类型</el-button
                      >
                    </div>
                  </el-card>
                  <el-card class="settingCard" shadow="never">
                    <div slot="header" class="settingName">BOTQQ</div>
                    <div class="settingBody">
                      <el-input
                        class="settingInput"
                        placeholder="请输入内容"
                        v-model="bot.botQQ"
                        :disabled="disQQ"
                      />
                      <el-button
                        type="primary"
                        style="margin-left: 10px"
                        size="small"
                        :disabled="disQQ"
                        >修改QQ</el-button
                      >
                    </div>
                  </el-card>

                  <el-card class="settingCard" shadow="never">
                    <div slot="header" class="settingName">危险操作</div>
                    <div class="settingBody" id="danger">
                      <el-card class="settingCard" shadow="never">
                        <div
                          slot="header"
                          class="settingName"
                          style="font-size: 12px"
                        >
                          终止
                        </div>
                        <div class="settingBody">
                          <el-button type="danger" size="mini" @click="stopBot"
                            >停止BOT</el-button
                          >
                        </div>
                      </el-card>
                      <el-card class="settingCard" shadow="never">
                        <div
                          slot="header"
                          class="settingName"
                          style="font-size: 12px"
                        >
                          重装
                        </div>
                        <div class="settingBody">
                          <el-button type="danger" size="mini" @click="resetBot"
                            >重置BOT</el-button
                          >
                        </div>
                      </el-card>
                      <el-card class="settingCard" shadow="never">
                        <div
                          slot="header"
                          class="settingName"
                          style="font-size: 12px"
                        >
                          清除
                        </div>
                        <div class="settingBody">
                          <el-button
                            type="danger"
                            size="mini"
                            @click="deleteBot"
                            >删除BOT</el-button
                          >
                        </div>
                      </el-card>
                      <el-card class="settingCard" shadow="never">
                        <div
                          slot="header"
                          class="settingName"
                          style="font-size: 12px"
                        >
                          转移
                        </div>
                        <div class="settingBody">
                          <el-button
                            type="danger"
                            disabled
                            size="mini"
                            @click="deleteBot"
                            >更新持有者</el-button
                          >
                        </div>
                      </el-card>
                    </div>
                  </el-card>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="BOT模板" :visible.sync="showTemplate" width="40%">
      <el-collapse v-model="templateType" accordion>
        <el-collapse-item title="私聊机器人" name="1">
          <el-card class="settingCard" shadow="never">
            <div slot="header" class="settingName" style="font-size: 14px">
              可以捕获对应QQ所接收到的一些私聊内容，在自行处理后便可实现私密的自动对话
            </div>
            <div class="settingBody">
              <el-button type="primary" size="mini" @click="getTemplate"
                >替换模板</el-button
              >
            </div>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="群聊机器人" name="2">
          <el-card class="settingCard" shadow="never">
            <div slot="header" class="settingName" style="font-size: 14px">
              可以捕获对应QQ所在群聊中的一些内容，在自行处理后便可实现一个存在于群聊中的对话机器人，活跃气氛
            </div>
            <div class="settingBody">
              <el-button type="primary" size="mini" @click="getTemplate"
                >替换模板</el-button
              >
            </div>
          </el-card>
        </el-collapse-item>
        <el-collapse-item title="代码检查机器人" name="3">
          <el-card class="settingCard" shadow="never">
            <div slot="header" class="settingName" style="font-size: 14px">
              可以捕获对应QQ所在群聊中的文本代码，基于相应的静态检查工具便可将检查结果返回在群聊中
            </div>
            <div class="settingBody">
              <el-button type="primary" size="mini" @click="getTemplate"
                >替换模板</el-button
              >
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
import * as FT from "@/tools/frontTool";
import * as UserAPI from "@/APIs/user.js";
import * as BotAPI from "@/APIs/bot.js";
import Navigator from "@/components/Navigator";
export default {
  name: "Bot",
  components: {
    Navigator,
  },
  data() {
    return {
      FT,
      botOwner: false,
      tabPos: "intro",
      tabNames: ["intro", "advice", "setting"],
      bot: {
        botName: "小冰",
        botStatus: true,
        botIntro: "QQ的官方对话机器人",
        botType: 1,
        botQQ: 847590417,
        botOwner: {
          userId: 1,
          userName: "123",
        },
        botLog: "213",
        botCode: "import os\nprint('hello world')",
      },
      showTemplate: false,
      templateType: "1",
      showCheck: false,
      checkResult:
        "No config file found, using default configuration\n************* Module TEST.practise.classes_list.try_collection.try_collection\nC: 15, 0: Exactly one space required around assignment\ntest_daque=list()\n          ^ (bad-whitespace)\nC: 25, 0: Exactly one space required around assignment\nt1=time.time()\n  ^ (bad-whitespace)\nC: 26, 0: Exactly one space required after comma\nfor i in range(1,1000000):\n                ^ (bad-whitespace)\nC: 28, 0: Exactly one space required around assignment\nt=time.time()-t1\n ^ (bad-whitespace)\nC: 31, 0: Trailing newlines (trailing-newlines)\nC:  1, 0: Missing module docstring (missing-docstring)\nC:  6, 0: Invalid constant name 'a' (invalid-name)\nC:  7, 0: Invalid constant name 'list_a' (invalid-name)",
      disStart: false,
      disName: true,
      disQQ: true,
      disType: true,
      options: [
        {
          value: 1,
          label: "私聊机器人",
        },
        {
          value: 2,
          label: "群聊机器人",
        },
      ],
    };
  },
  async created() {
    this.botId = this.$route.params.botId;
    this.tabPos = this.$route.params.botPos;
    await this.getBotInfo();
  },
  methods: {
    async getBotInfo() {
      let res = await BotAPI.getBotInfo(this.botId);
      if (res.data.success) {
        this.bot = res.data.data;
        if (this.bot.botOwner.userId == this.$store.state.userId) {
          this.botOwner = true;
        }
      } else {
        this.$message.error("获取BOT详情失败，已跳转至BOT列表页");
        this.$router.push({ path: "/botList" });
      }
    },
    clickCommunity(target) {
      // 切换路由
      let toPath = "/bot/" + this.$route.params.botId + "/" + target.name;
      // 当路由需要切换时才切换
      if (toPath !== this.$route.path) {
        this.$router.push({
          path: "/bot/" + this.$route.params.botId + "/" + target.name,
        });
      }
      if (target.name !== "intro") {
        this.showCheck = false;
      }
    },
    handleCommand(command) {
      if (command == "check") {
        this.showCheck = true;
      }
      if (command == "download") {
        this.downloadCode();
      }
      if (command == "template") {
        this.showTemplate = true;
      }
    },
    downloadCode() {
      this.FT.building();
    },
    getTemplate() {
      this.$confirm(
        "替换模板后现有的业务代码将被完全重置为模板，请注意代码备份！",
        "注意",
        {
          confirmButtonText: "继续替换",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (this.templateType == "1") {
            this.bot.botCode = "si liao ji qi ren";
            this.$message.success("业务代码已替换为私聊机器人模板");
            this.showTemplate = false;
            return;
          }
          if (this.templateType == "2") {
            this.bot.botCode = "qun liao ji qi ren";
            this.$message.success("业务代码已替换为群聊机器人模板");
            this.showTemplate = false;
            return;
          }
          this.$message.info("更多机器人模板代码更新中");
        })
        .catch(() => {});
    },
    startBot() {
      this.$confirm(
        "运行BOT将基于当前业务代码替换正在运行的服务，是否继续？",
        "注意",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          this.disStart = true;
          let res = await BotAPI.startBot(this.botId);
          console.log(res);
          if (res.data.success) {
            setTimeout(() => {
              this.$message.success("服务已成功部署至对应账号");
              this.disStart = false;
            }, 1000);
          } else {
            setTimeout(() => {
              this.$message.error("服务部署失败，请稍后再试");
              this.disStart = false;
            }, 1000);
          }
        })
        .catch(() => {});
    },
    stopBot() {
      this.$confirm("即将停止BOT，有关的服务也将无法使用，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          let res = await BotAPI.stopBot(this.botId);
          console.log(res);
          if (res.data.success) {
            this.$message.success("BOT已停止");
          } else {
            this.$message.error("BOT停止失败，请稍后再试");
          }
        })
        .catch(() => {});
    },
    resetBot() {
      this.$confirm(
        "即将重新初始化BOT，业务代码会被重置为相应模板内容，是否继续？",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "BOT已重置",
          });
        })
        .catch(() => {});
    },
    deleteBot() {
      this.$confirm(
        "即将删除该BOT，服务首先会被停止，有关内容也均将被删除, 是否继续？",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(async () => {
          let res = await BotAPI.deleteBot(this.botId);
          console.log(res);
          if (res.data.success) {
            this.$message.success("BOT已删除");
            this.$router.push({ path: "/botList" });
          } else {
            this.$message.error("BOT删除失败，请稍后再试");
          }
        })
        .catch(() => {});
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
  padding-bottom: 15px;
}
#down_card {
  padding-bottom: 0px;
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
  /* min-height: 600px; */
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 18px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.statusTag {
  margin-left: 0px;
}
.introTitle {
  float: left;
  color: #606266;
  font-size: 15px;
}
.introTip {
  color: #787a80;
  font-size: 13px;
  margin-bottom: 5px;
}
.introCon {
  color: #65676d;
  font-size: 15px;
  margin-top: 5px;
}
.introBody /deep/ .el-textarea__inner {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.checkPart {
  margin-top: 10px;
}

.settingCard {
  padding: 0;
}
.settingName {
  font-size: 14px;
}
.el-card .settingCard {
  border: 0;
}
.settingCard /deep/ .el-card__header {
  padding-top: 6px;
  padding-bottom: 2px;
  border: 0;
}
.settingCard /deep/ .el-card__body {
  padding-top: 2px;
  padding-bottom: 10px;
  /* border: 1px solid #b8b9bd; */
  border-radius: 5px;
}
.settingBody .el-button {
  text-align: center;
  width: 90px;
}
.settingInput {
  width: 50%;
}
#danger {
  border: 2px solid #f56c6c;
  border-radius: 5px;
}
</style>