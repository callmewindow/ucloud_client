<template>
  <div id="FLA">
    <div v-if="!haveFriend">暂无好友</div>
    <div v-if="haveFriend">
      <div class="friendItem" v-for="(item,index) in friendList" :key="index">
        <div class="friendName">{{item.user_nickname}}</div>
        <div
          class="lastMessage"
          v-if="item.last_message.content"
        >{{ item.last_message.content | cutMsg }}</div>
        <div class="lastMessage" v-if="!item.last_message.content">对方暂无消息</div>
        <!-- <div class="msgStatusNo" v-if="item.last_message.is_read == 0">未读</div>
        <div class="msgStatusYes" v-if="item.last_message.is_read == 1">已读</div>-->
        <div class="friendBtn">
          <el-button size="mini" type="primary" @click="showMsg(index)">私信</el-button>
          <el-button size="mini" type="primary" @click="deleteFriend(index)">删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog :title="msgTitle" :visible.sync="showMsgUp" width="40%">
      <PrivateMessages :friendId="talkId" />
    </el-dialog>
  </div>
</template>

<script>
import * as NoticeAPI from "@/APIs/notice";
import * as UserAPI from "@/APIs/user";
import * as FT from "@/tools/frontTool";
import PrivateMessages from "@/components/PrivateMessages";

export default {
  name: "FriendList",
  components: {
    PrivateMessages,
  },
  data() {
    return {
      FT,
      haveFriend: false,
      showMsgUp: false,
      msgTitle: "",
      talkId: 0,
      friendList: [],
    };
  },
  filters: {
    cutMsg(str) {
      if (str.length > 8) {
        return str.slice(0, 8) + "...";
      } else {
        return str;
      }
    },
  },
  async created() {
    await this.getFriendList();
  },
  methods: {
    async getFriendList() {
      let temp = await NoticeAPI.getAllFriend(this.$store.state.userId);
      this.friendList = temp.data.users;
      console.log(23, temp);
      if (!this.friendList || this.friendList.length == 0) {
        this.haveFriend = false;
      } else {
        this.haveFriend = true;
      }
    },
    showMsg(i) {
      console.log(this.friendList[i]);
      this.showMsgUp = true;
      let name = this.friendList[i].user_nickname;
      this.msgTitle = "与" + name + "的对话";
      this.talkId = String(this.friendList[i].id);
    },
    async deleteFriend(i) {
      let name = this.friendList[i].user_nickname;
      let id = this.friendList[i].id;
      this.$confirm("是否确定删除和 " + name + " 的好友关系？", "好友删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let temp = await UserAPI.deleteFriend(this.$store.state.userId, id);
          console.log(temp);
          this.getFriendList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
#FLA {
  /* width: 500px;
  height: 400px;
  padding: 20px;
  overflow: scroll; */
  background-color: white;
}
.friendItem {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.friendItem:nth-child(1) {
  margin-top: 0px;
}
.friendName {
  font-size: 17px;
  float: left;
  margin-left: 20px;
}
.lastMessage {
  font-size: 13px;
  color: gray;
  float: left;
  margin-left: 12px;
}
.msgStatusYes {
  font-size: 13px;
  color: gray;
  float: left;
  margin-left: 8px;
  font-weight: bold;
}
.msgStatusNo {
  font-size: 13px;
  float: left;
  color: #409eff;
  margin-left: 5px;
  font-weight: bold;
}
.friendBtn {
  margin-right: 10px;
  float: right;
}
</style>