<template>
  <div style="margin-bottom: 20px;">
    <!--帖子标题、置顶精华标签-->
    <el-row style="margin-left: 20px; margin-bottom: 20px">
      <div
          style="font-family: 微软雅黑; color: rgb(0,102,204); float: left; font-size: 26px; font-weight: bold"
      >{{ post.title }}
      </div>
      <el-tag type="primary" effect="dark" style="margin-left: 5px;" v-if="post.top === 1">置顶</el-tag>
      <el-tag
          type="warning"
          color="rgb(255,215,0)"
          effect="dark"
          style="margin-left: 5px;"
          v-if="post.star === 1"
      >精华
      </el-tag>
    </el-row>
    <!--帖子作者、时间、阅读量-->
    <el-row style="font-size: 18px; margin-bottom: 20px;">
      <el-col :span="12">
        <div style="margin-left: 20px; color: rgb(120,120,120)">
          <el-button type="text" style="font-size: 18px" @click="addFriend(floor1.author,floor1.owner.user_nickname)">
            {{ post.author }}
          </el-button>
          <el-divider direction="vertical"></el-divider>
          {{ post.datetime|cut }}
        </div>
      </el-col>
      <el-col :span="12">
        <div style="float: right; margin-right: 50px; color: rgb(120,120,120)">阅读量：{{ post.read }}</div>
      </el-col>
    </el-row>
    <!--帖子内容-->
    <el-row>
      <div style="font-size: 20px; margin-left: 20px; margin-right: 20px">{{ post.content }}</div>
    </el-row>
    <!--置顶加精按钮、点赞按钮、回复按钮、举报按钮-->
    <el-row style="margin-top: 20px; margin-bottom: 20px">
      <div style="float: right; margin-right: 30px">
        1楼
        <el-divider v-if="test" direction="vertical"></el-divider>
        <el-button type="primary" icon="el-icon-caret-top" size="mini" plain circle @click="like"></el-button>
        喜欢：{{ post.like }}
        <el-button
            type="primary"
            icon="el-icon-caret-bottom"
            size="mini"
            plain
            circle
            @click="dislike"
        ></el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="show_reply_box">回复</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="report">举报</el-button>
      </div>
    </el-row>
    <!--回复文本框、发送-->
    <el-card v-if="reply_button_clicked" style="margin-bottom: 20px;">
      <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入回复内容"
          v-model="reply_text"
          maxlength="500"
          show-word-limit
          style="font-size: 20px; margin-bottom: 20px"
      ></el-input>
      <el-button
          type="primary"
          plain
          @click="send_reply"
          style="float: right; margin-bottom: 20px"
      >发送
      </el-button>
    </el-card>
    <!--帖子回复列表-->
    <el-card v-for="reply in reply_list" :key="reply.id" style="margin-bottom: 20px;">
      <el-row style="margin-top: 10px; margin-bottom: 20px; margin-left: 5px">
        <div style="font-size: 20px;">{{ reply.content }}</div>
      </el-row>
      <el-row style="margin-left: 5px">
        <el-col :span="12">
          <div>
            <el-button type="text" style="font-size: 18px" @click="addFriend(reply.author,reply.owner.user_nickname)">
              {{ reply.owner.user_nickname }}
            </el-button>
            <el-divider direction="vertical"></el-divider>
            {{ reply.post_time|cut }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="float: right; margin-right: 20px">
            {{ reply.floor_num }}楼
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="reply_reply(reply.floor_num)">回复</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="report">举报</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as UserAPI from "@/APIs/user.js";
import * as FT from "@/tools/frontTool";

export default {
  name: "PostDetail",
  props: {
    postId: String,
  },
  data() {
    return {
      test: true,
      reply_button_clicked: false,
      firstFloorId: 0,
      reply_text: "",
      post: {
        id: 0,
        title: "",
        author: "",
        author_tag: "",
        datetime: "",
        content: "",
        read: 0,
        like: 0,
        top: 0,
        star: 0,
      },
      floor1: {},
      reply_list: [],
    };
  },
  watch: {
    postId(newID) {
      let numPID = parseInt(newID);
      this.get_post_detail(numPID);
    },
  },
  created() {
    let numPID = parseInt(this.postId);
    this.get_post_detail(numPID);
  },
  filters: {
    cut(str) {
      if (str) str = str.slice(5, 16);
      return str;
    },
  },
  methods: {
    async addFriend(FID, name) {
      this.$confirm("是否向" + name + "发送好友请求", "添加好友", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
          .then(async () => {
            if (FID === this.$store.state.userId) {
              this.$message.warning("不能向自己发送好友请求");
              return;
            }
            await UserAPI.sendFriendApply(
                this.$store.state.userId,
                FID,
                new Date().Format("yyyy-MM-dd hh:mm:ss")
            );
            this.$message.success({
              message: "成功发送好友请求",
            });
          })
          .catch(() => {
          });
    },
    async like(e) {
      // await postAPI.likeFloor(this.$store.state.userId, this.firstFloorId);
      this.post.like += 1;
      this.test = false;
      this.test = true;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    async dislike(e) {
      if (this.post.like > 0) {
        this.post.like -= 1;
        // await postAPI.dislikeFloor(this.$store.state.userId, this.firstFloorId);
      }
      this.test = false;
      this.test = true;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    report(e) {
      this.$confirm("是否决定举报该层内容", "再次确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.$message({
              message: "举报以受理",
            });
          })
          .catch(() => {
          });
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    reply_reply(id) {
      this.reply_text = "回复" + id + "楼: ";
      this.reply_button_clicked = true;
      document.scrollingElement.scrollTop = 0;
    },
    show_reply_box(e) {
      this.reply_text = "";
      this.reply_button_clicked = !this.reply_button_clicked;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    async get_post_detail(pid) {
      try {
        const detail_dict = await postAPI.postDetail(pid);
        console.log(detail_dict);
        this.post.id = detail_dict.data.post.id;
        this.post.title = detail_dict.data.post.title;
        this.post.author = detail_dict.data.post.owner.user_nickname;
        this.post.datetime = detail_dict.data.floors[0].post_time;
        this.post.content = detail_dict.data.floors[0].content;
        this.post.read = detail_dict.data.post.watches;
        this.post.like = detail_dict.data.floors[0].like_num;
        this.post.top = detail_dict.data.post.topped;
        this.post.star = detail_dict.data.post.stared;
        this.firstFloorId = detail_dict.data.floors[0].id;
        this.floor1 = detail_dict.data.floors[0];
        this.reply_list = [];
        for (let i = 1; i < detail_dict.data.floors.length; i++) {
          this.reply_list.push(detail_dict.data.floors[i]);
        }
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async send_reply(e) {
      if (this.reply_text === "") {
        this.$message.error("不能回复空内容");
        return;
      }
      if (FT.CS(this.reply_text)) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      let date = new Date();
      let mon = (date.getMonth() + 1).toString();
      if (mon.length < 2) mon = "0" + mon;
      let day = date.getDate().toString();
      if (day.length < 2) day = "0" + day;
      let hor = date.getHours().toString();
      if (hor.length < 2) hor = "0" + hor;
      let min = date.getMinutes().toString();
      if (min.length < 2) min = "0" + min;
      let reply_dict = {
        floor_num: this.reply_list.length + 2,
        content: this.reply_text,
        owner: {user_nickname: this.$store.state.nickname},
        post_time: mon + "-" + day + " " + hor + ":" + min,
      };
      this.reply_list.push(reply_dict);
      try {
        await postAPI.replyPost(this.post.id, this.$store.state.userId, this.reply_text);
      } catch (e) {
        this.$message.error("回复请求超时");
      }
      this.$message({
        message: "回复成功",
        type: "success",
      });
      this.reply_button_clicked = false;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
  },
};
</script>