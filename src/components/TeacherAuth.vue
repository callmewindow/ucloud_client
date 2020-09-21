<template>
  <div id="sendTA">
    <!-- <div slot="header">
      发布帖子
    </div>-->
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>真实姓名
      </div>
      <el-input
        :disabled="status === 'result'"
        v-model="auth.name"
        placeholder="请输入内容"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>所属机构/学校
      </div>
      <el-input
        :disabled="status === 'result'"
        v-model="auth.school"
        placeholder="请输入内容"
        maxlength="30"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>教职工号
      </div>
      <el-input
        :disabled="status === 'result'"
        v-model="auth.schoolId"
        placeholder="请输入内容"
        maxlength="20"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>职称
      </div>
      <el-input
        :disabled="status === 'result'"
        v-model="auth.profession"
        placeholder="请输入内容"
        maxlength="10"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>联系邮箱
      </div>
      <el-input
        :disabled="status === 'result'"
        v-model="auth.email"
        placeholder="请输入内容"
        maxlength="20"
        show-word-limit
      ></el-input>
      <div v-if="status !== 'result'" class="itemTip">注：邮箱有接收认证结果的功能</div>
    </div>

    <el-button
      v-if="status !== 'result'"
      id="sendBtn"
      type="primary"
      size="small"
      @click="sendAuth"
    >发送申请</el-button>
  </div>
</template>

<script>
import * as userAPI from "@/APIs/user";
import * as FT from "@/tools/frontTool";
export default {
  name: "TeacherAuth",
  props: {
    status: String,
  },
  data() {
    return {
      auth: {
        name: "",
        school: "",
        schoolId: "",
        profession: "",
        email: "",
      },
    };
  },
  async created() {
    if (this.status == "result") {
      await userAPI.getUserDetail(this.$store.state.userId).then((res) => {
        this.auth.name = res.data.user.realname;
        this.auth.school = res.data.user.school;
        // this.auth.schoolId = res.data.user.school_id;
        this.auth.schoolId = "17373109";
        // this.auth.profession = res.data.user.profession;
        this.auth.profession = "学生";
        this.auth.email = res.data.user.email;
      });
    }
  },
  methods: {
    async sendAuth() {
      if (
        this.auth.name === "" ||
        this.auth.school === "" ||
        this.auth.schoolId === "" ||
        this.auth.profession === ""
      ) {
        this.$message.error("请填写完完整内容后再提交认证");
        return;
      }
      if (!FT.isEmail(this.auth.email)) {
        this.$message.error("请输入正确格式的邮箱");
        return;
      }
      if (
        FT.CS(
          this.auth.name +
            this.auth.school +
            this.auth.schoolId +
            this.auth.profession +
            this.auth.email
        )
      ) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      console.log(this.auth);
      this.$confirm("请检查信息无误后点击确认提交按钮", "再次确认", {
        confirmButtonText: "确认提交",
        cancelButtonText: "继续编辑",
      })
        .then(async () => {
          let msg = await userAPI.modifyUserInfo(this.$store.state.userId,this.auth);
          console.log(msg);
          this.$message({
            type: "success",
            message: "认证发送成功",
          });
          location.reload();
        })
        .catch(() => {});
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
  margin-top: -20px;
}
.itemTitle {
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
}
.itemTip {
  font-size: 12px;
  color: gray;
  margin-top: 2px;
  margin-left: 2px;
}
#sendBtn {
  margin-bottom: -10px;
}
</style>