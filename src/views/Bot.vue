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
                <div class="bot_type" v-if="bot.botType == 1">私聊机器人</div>
                <div class="bot_type" v-if="bot.botType == 2">群聊机器人</div>
                <div class="bot_type" v-if="bot.botType == 3">
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
                          辅助功能
                          <i class="el-icon-cloudy el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="template"
                            >获取模板</el-dropdown-item
                          >
                          <el-dropdown-item command="log"
                            >查看日志</el-dropdown-item
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
                        style="
                          float: right;
                          padding: 1px 0;
                          margin-left: 10px;
                          color: #67c23a;
                        "
                        type="text"
                        @click="showFork = true"
                        >复制BOT</el-button
                      >
                      <el-button
                        style="float: right; padding: 1px 0"
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
                      <div class="introCon" v-show="!showCheck">
                        {{ bot.botIntro }}
                      </div>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 20 }"
                        placeholder="业务代码为空..."
                        v-model="bot.botCode"
                        :disabled="!codeEdit"
                      ></el-input>
                      <div v-if="botOwner" style="margin-top: 5px">
                        <el-button
                          v-if="!codeEdit"
                          type="primary"
                          size="mini"
                          icon="el-icon-edit"
                          @click="codeEdit = true"
                        ></el-button>
                        <el-button
                          v-show="codeEdit"
                          type="success"
                          size="mini"
                          @click="saveCode"
                          >保存</el-button
                        >
                        <el-button
                          v-show="codeEdit"
                          type="info"
                          size="mini"
                          @click="codeEdit = false"
                          >取消</el-button
                        >
                      </div>
                    </div>
                    <div class="checkPart" v-show="showCheck">
                      <div class="introTip">运行/检查结果</div>
                      <el-input
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

              <el-tab-pane :name="tabNames[2]" v-if="botOwner">
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
    <el-dialog
      title="BOT运行日志"
      :fullscreen="true"
      :visible.sync="showLog"
      width="40%"
    >
      <el-row>
        <el-col :span="20" :offset="1">
          <div class="introTip">
            日志详情
            <el-button
              type="primary"
              style="margin-left: 10px"
              size="mini"
              @click="getNewLog"
              for="logInput"
              >刷新日志</el-button
            >
          </div>

          <el-input
            ref="logCon"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 25 }"
            resize="both"
            placeholder="暂无运行日志内容"
            v-model="trueLog"
          ></el-input>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="BOT快速复制功能" :visible.sync="showFork" width="40%">
      <div class="introCon">
        此举将基于当前BOT除QQ之外的所有内容，来复刻一个属于您的BOT。<br />
        如确认复制请输入新的QQ号与密码，并点击下方确认按钮进行复制。
      </div>
      <el-card class="settingCard" shadow="never">
        <div slot="header" class="settingName">新BOT名称</div>
        <div class="settingBody">
          <el-input
            class="settingInput"
            placeholder="请输入内容"
            v-model="newBot.botName"
          />
        </div>
      </el-card>
      <el-card class="settingCard" shadow="never">
        <div slot="header" class="settingName">新BOT对应QQ</div>
        <div class="settingBody">
          <el-input
            class="settingInput"
            placeholder="请输入内容"
            v-model="newBot.botQQ"
          />
        </div> </el-card
      ><el-card class="settingCard" shadow="never">
        <div slot="header" class="settingName">QQ对应密码</div>
        <div class="settingBody">
          <el-input
            class="settingInput"
            placeholder="请输入内容"
            v-model="newBot.botPassword"
          />
        </div>
      </el-card>
      <el-button
        type="success"
        size="small"
        @click="forkBot"
        style="margin-top: 10px"
        >确认</el-button
      >
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
      botId: null,
      userId: null,
      botOwner: false,
      tabPos: "intro",
      tabNames: ["intro", "advice", "setting"],
      trueLog: "暂无日志内容",
      bot: {
        botName: "加载中",
        botStatus: true,
        botIntro: "机器人信息加载中",
        botType: 1,
        botQQ: 0,
        botOwner: {
          userId: 1,
          userName: "加载中",
        },
        botLog: "",
        botCode: "print('加载中')",
      },
      newBot: {
        botName: "",
        botQQ: "",
        botPassword: "",
      },
      codeEdit: false,
      showTemplate: false,
      codeTemplate: [`import asyncio
from graia.broadcast import Broadcast
from graia.application import GraiaMiraiApplication, Session, Group, Member, MessageChain, Friend
from graia.application.message.elements.internal import Plain

loop = asyncio.get_event_loop()
bcc = Broadcast(loop=loop)
app = GraiaMiraiApplication(
    broadcast=bcc,
    connect_info=Session(
        host='http://localhost:8080',
        authKey='3285415231',
        account=此处填入QQ号,
        websocket=True,

    )
)


@bcc.receiver('FriendMessage')
async def friend_message_listener(app: GraiaMiraiApplication, message: MessageChain, friend: Friend):

    content = message.asDisplay()
    if content == '你好':
        await app.sendFriendMessage(
            target=friend,
            message=MessageChain.create([Plain(text='你好，我是私聊bot')])
        )
        return
    await app.sendFriendMessage(
        target=friend,
        message=MessageChain.create([Plain(text='你在说啥？')])
    )
    return


app.launch_blocking()
`, `import asyncio

from graia.broadcast import Broadcast
from graia.application import GraiaMiraiApplication, Session, Group, Member, MessageChain
from graia.application.message.elements.internal import Plain

loop = asyncio.get_event_loop()
bcc = Broadcast(loop=loop)
app = GraiaMiraiApplication(
    broadcast=bcc,
    connect_info=Session(
        host='http://localhost:8080',
        authKey='3285415231',
        account=此处填入QQ号,
        websocket=True,

    )
)


@bcc.receiver('GroupMessage')
async def group_message_listener(app: GraiaMiraiApplication, message: MessageChain, group: Group, member: Member):

    content = message.asDisplay()
    if content == '你好':
        await app.sendGroupMessage(
            group=group,
            message=MessageChain.create([Plain(text='你好，我是群聊bot')])
        )
        return
    await app.sendGroupMessage(
        group=group,
        message=MessageChain.create([Plain(text='你在说啥？')])
    )
    return


app.launch_blocking()
`, `import asyncio, re, os

from graia.broadcast import Broadcast
from graia.application import GraiaMiraiApplication, Session, Group, Member, MessageChain
from graia.application.message.elements.internal import Plain

loop = asyncio.get_event_loop()
bcc = Broadcast(loop=loop)
app = GraiaMiraiApplication(
    broadcast=bcc,
    connect_info=Session(
        host='http://localhost:8080',
        authKey='3285415231',
        account=此处填入QQ号,
        websocket=True
    )
)


@bcc.receiver('GroupMessage')
async def group_message_listener(app: GraiaMiraiApplication, message: MessageChain, group: Group, member: Member):
    # 小程序解析

    if group.id != bot_test:
        return
    content = message.asDisplay()
    with open('/home/mirai/bot/code.py', 'w') as f:
        f.write(content)
    os.system(r'pylint code.py > /home/mirai/bot/pylint.out')

    out = ''
    with open('/home/mirai/bot/pylint.out', 'r') as f:
        out = f.read()
    await app.sendGroupMessage(
        group=group,
        message=MessageChain.create([Plain(text=out)])
    )
    return


app.launch_blocking()
`],
      templateType: "1",
      showLog: false,
      showFork: false,
      showCheck: false,
      checkResult: "检查结果加载中",
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
    let oldUI = JSON.parse(localStorage.getItem("userInfo"));
    if (oldUI) {
      this.$store.state.username = oldUI.username;
      this.$store.state.userId = oldUI.userId;
    } else {
      this.$message("请登录后查看更多内容");
      this.$router.push({ path: "/Login" });
    }
    this.userId = this.$store.state.userId;
    this.botId = this.$route.params.botId;
    this.tabPos = this.$route.params.botPos;
    await this.getBotInfo();
  },
  methods: {
    async getBotInfo(str) {
      let res = await BotAPI.getBotInfo(this.botId);
      if (res.data.success) {
        this.bot = res.data.data;
        this.trueLog = "";
        for (let i = 0; i < 100 && i < this.bot.botLog.length; i++) {
          this.trueLog += this.bot.botLog[i] + "\n";
        }
        if (str == "f5") {
          this.$message.success("日志刷新成功");
        }
        console.log(this.bot);
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
    async handleCommand(command) {
      if (command == "check") {
        this.$confirm(
          "代码检查将会自动保存当前编辑框中的代码至云端，是否继续？",
          "注意",
          {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => {
            this.codeEdit = false;
            let res = await BotAPI.uploadCode(this.botId, this.bot.botCode);
            if (res.data.success) {
              this.$message.success("代码审查成功，结果见下方");
              this.showCheck = true;
              this.checkResult = res.data.data.checkResult;
            } else {
              this.$message.error("代码审查失败，请稍后再试");
            }
          })
          .catch(() => {});
      }
      if (command == "download") {
        this.downloadCode();
      }
      if (command == "template") {
        this.showTemplate = true;
      }
      if (command == "log") {
        this.showLog = true;
        this.$nextTick(() => {
          this.$refs.logCon.focus();
        });
      }
    },
    getNewLog() {
      this.getBotInfo("f5");
      // 配置焦点，自动位于最下方
      this.$nextTick(() => {
        this.$refs.logCon.focus();
      });
    },
    async downloadCode() {
      let res = await BotAPI.getBotCode(this.botId);
      const address = this.$router.resolve({
        path: "/api/bot/download?botId=" + this.botId,
      });
      // 跳过前面的路由符号
      window.open(address.href.substring(2), "_blank");
    },
    getTemplate() {
      this.$confirm(
        "替换模板后会首先暂停BOT，进而代码将被重置为对应类型的模板并保存至云端，请注意代码备份！",
        "注意",
        {
          confirmButtonText: "继续替换",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          if (this.templateType == "1") {
            // 首先暂停BOT
            await BotAPI.stopBot(this.botId);
            // 替换代码
            this.bot.botCode = this.codeTemplate[0];
            await BotAPI.uploadCode(this.botId, this.bot.botCode);
            this.$message.success("业务代码已替换为私聊机器人模板");
            // 显示替换结果
            this.showTemplate = false;
            return;
          }
          if (this.templateType == "2") {
            await BotAPI.stopBot(this.botId);
            this.bot.botCode = this.codeTemplate[1];
            await BotAPI.uploadCode(this.botId, this.bot.botCode);
            this.$message.success("业务代码已替换为群聊机器人模板");
            this.showTemplate = false;
            return;
          }
          if (this.templateType == "3") {
            await BotAPI.stopBot(this.botId);
            this.bot.botCode = this.codeTemplate[2];
            await BotAPI.uploadCode(this.botId, this.bot.botCode);
            this.$message.success("业务代码已替换为代码检查机器人模板");
            this.showTemplate = false;
            return;
          }
        })
        .catch(() => {});
    },
    async saveCode() {
      let res = await BotAPI.uploadCode(this.botId, this.bot.botCode);
      if (res.data.success) {
        this.$message.success(res.data.message);
        this.showCheck = true;
        this.checkResult = res.data.data.checkResult;
      } else {
        this.$message.error("代码更新失败，请稍后再试");
      }
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
          if (res.data.success) {
            setTimeout(() => {
              this.$message.success("服务已成功部署至对应账号");
              this.disStart = false;
            }, 1000);
            this.getBotInfo();
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
      if (this.bot.botStatus == false) {
        this.$message.info("机器人并未运行，无需关闭");
        return;
      }
      this.$confirm("即将停止BOT，有关的服务也将无法使用，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(async () => {
          let res = await BotAPI.stopBot(this.botId);
          if (res.data.success) {
            this.$message.success("BOT已停止");
            this.getBotInfo();
          } else {
            this.$message.error("BOT停止失败，请稍后再试");
          }
        })
        .catch(() => {});
    },
    resetBot() {
      this.$confirm(
        "即将初始化BOT，BOT将首先被停止，进而业务代码被重置为相应模板内容，是否继续？",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      )
        .then(async () => {
          // 首先停止BOT
          await BotAPI.stopBot(this.botId);
          // 然后更新模板代码
          this.bot.botCode = this.codeTemplate[this.bot.botType - 1];
          await BotAPI.uploadCode(this.botId, this.bot.botCode);
          // 显示重置成功
          this.$message({
            type: "success",
            message: "BOT已重置",
          });
          // 回到intro页面
          this.tabPos = "intro";
          this.$router.push("intro");
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
          if (res.data.success) {
            this.$message.success("BOT已删除");
            this.$router.push({ path: "/user/" + this.$store.state.userId });
          } else {
            this.$message.error("BOT删除失败，请稍后再试");
          }
        })
        .catch(() => {});
    },
    async forkBot() {
      if (
        this.newBot.botQQ == "" ||
        this.newBot.botPassword == "" ||
        this.newBot.botName == ""
      ) {
        this.$message.error("请填写完整信息后再进行赋复制操作");
        return;
      }
      let res = await BotAPI.forkBot(
        this.botId,
        this.userId,
        this.newBot.botName,
        this.newBot.botQQ,
        this.newBot.botPassword
      );
      // 成功就直接跳转到新的bot详情
      if (res.data.success) {
        this.showFork = false;
        this.$message.success("新BOT复制成功，详情如下");
        this.$router.push({ path: "/bot/" + res.data.data.botId });
        location.reload();
      } else {
        this.$message.error(res.data.message);
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
.bot_type {
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
  margin-top: 2px;
  margin-bottom: 4px;
}
.el-textarea /deep/ .el-textarea__inner {
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