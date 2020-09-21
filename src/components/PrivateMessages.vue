<template>
  <div class="All">
    <el-card v-if="!haveMsg">暂无最近对话</el-card>
    <el-card v-if="haveMsg" id="big_card">
      <el-col :key="index" v-for="(message,index) in messageList">
        <el-card id="message_card">
          <div
            v-if="message.sender_id !== speakersId.user1Id"
            style="color: #ff7256;float: left;margin-right: 20px; font-size: 15px"
          >{{message.name}}</div>
          <div
            v-if="message.sender_id === speakersId.user1Id"
            style="color: #409EFF;float: left;margin-right: 35px; font-size: 15px"
          >{{message.name}}</div>
          <div style="color: #909399">{{message.send_time}}</div>
          <br />
          {{message.content}}
        </el-card>
      </el-col>
    </el-card>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入消息内容"
      v-model="text.textarea"
      style="margin-top: 30px"
    ></el-input>
    <el-button type="primary" style="margin-top: 10px;" @click="send_message">发送</el-button>
    <br />
  </div>
</template>

<script>
import * as noticeAPI from "@/APIs/notice.js";

export default {
  name: "private_message",
  props: {
    friendId: String,
  },
  data() {
    return {
      haveMsg: false,
      speakersId: {
        user1Id: this.$store.state.userId,
        user2Id: 0,
      },
      text: {
        senderId: "",
        receiverId: "",
        textarea: "",
        time: "",
      },
      messageList: [],
    };
  },
  watch: {
    friendId(newID) {
      this.speakersId.user2Id = parseInt(newID);
      this.get_message_list();
    },
  },
  created() {
    this.speakersId.user2Id = parseInt(this.friendId);
    this.get_message_list();
  },

  methods: {
    async get_message_list() {
      const list = await noticeAPI.getPrivateMessages(this.speakersId);
      console.log(list);
      this.messageList = list.data;
      if (this.messageList.length == 0 || this.messageList.msg == 'empty privateMessage') {
        this.haveMsg = false;
      } else {
        this.haveMsg = true;
        this.messageList.reverse();
        console.log(this.messageList);
        for (var num = 0; num < this.messageList.length; num++) {
          if (this.messageList[num].sender_id === this.speakersId.user1Id) {
            this.messageList[num].name = "您";
          } else {
            this.messageList[num].name = "对方";
          }
        }
      }
    },

    async send_message() {
      this.text.senderId = this.speakersId.user1Id;
      this.text.receiverId = this.speakersId.user2Id;
      this.text.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      const res = await noticeAPI.sendPrivateMessages(this.text);
      console.log(res);
      if (res.data.msg === "success") {
        this.get_message_list();
        this.text.textarea = "";
      } else {
        //this.$message.error('消息发送失败');
      }
    },
  },
};
</script>

<style scoped>
.All {
  text-align: left;
}

#big_card {
  height: 350px;
  overflow: scroll;
  overflow-x: hidden;
}

#message_card {
  height: 100px;
  margin-bottom: 10px;
}
</style>
