<template>
  <div id="sendPA">
    <!-- <div slot="header">
      发布帖子
    </div>-->
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>帖子标题
      </div>
      <el-input v-model="post.title" placeholder="请输入内容" maxlength="30" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>帖子内容
      </div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="post.content"
        resize="none"
        maxlength="500"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem" style="width:50%">
      <div class="itemTitle">帖子标签</div>
      <el-select v-model="postTag" filterable clearable default-first-option placeholder="添加额外标签">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-button id="sendBtn" type="primary" size="small" @click="sendPost">发布</el-button>
  </div>
</template>

<script>
import * as forumAPI from "@/APIs/forum";
import * as FT from "@/tools/frontTool";
export default {
  name: "SendPost",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      options: [
        {
          value: "学习讨论",
          label: "学习讨论",
        },
        {
          value: "课程链接",
          label: "课程链接",
        },
        {
          value: "资源分享",
          label: "资源分享",
        },
      ],
      postTag: "",
    };
  },
  methods: {
    async sendPost() {
      if (this.post.title === "" || this.post.content === "") {
        this.$message.error("不能发送空帖子");
        return;
      }
      if (FT.CS(this.post.title + this.post.content)) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      let tempP = {
        title: this.post.title,
        content: this.post.content,
        senderId: this.$store.state.userId,
        tags: this.postTag,
        courseId: this.$route.params.courseId,
      };
      try {
        await forumAPI.sendPost(tempP);
        if (this.$store.state.permission !== 2) {
          await forumAPI.addPoint(
            this.$store.state.userId,
            this.$route.params.courseId,
            100
          );
        }
      } catch (error) {
        console.log(error);
      }
      location.reload();
    },
  },
};
</script>

<style scoped>
.sendItem {
  width: 80%;
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