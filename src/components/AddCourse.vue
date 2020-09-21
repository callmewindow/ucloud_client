<template>
  <div class="All">
    <!-- <Navigator active-func="class" />
    <el-card id="card">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="bg-top font-top">
            添加课程
            <el-divider></el-divider>
          </div>
        </el-col>
    </el-row>-->
    <el-row>
      <el-steps
        style="margin-top:-30px;margin-left:15%;width:70%"
        :active="page"
        finish-status="success"
        align-center
      >
        <el-step title="课程信息填写" icon="el-icon-edit-outline"></el-step>
        <el-step title="添加完成" icon="el-icon-document-checked"></el-step>
      </el-steps>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-white">
          <el-tabs type="border-card">
            <el-form :model="Form" :rules="rules" ref="Form" label-width="120px" v-if="page===0">
              <el-form-item></el-form-item>

              <el-form-item label="课程名" prop="courseTitle">
                <el-input v-model="Form.courseTitle"></el-input>
              </el-form-item>

              <el-form-item label="所属专业" prop="courseMajor">
                <el-input v-model="Form.courseMajor"></el-input>
              </el-form-item>

              <el-form-item label="课程简介" prop="courseIntro">
                <el-input type="textarea" v-model="Form.courseIntro"></el-input>
              </el-form-item>

              <el-form-item label="开课日期" prop="startTime" required>
                <el-col :span="12">
                  <el-form-item prop="startTime">
                    <el-date-picker
                      type="date"
                      :picker-options="startDate"
                      placeholder="请选择日期"
                      v-model="Form.startTime"
                      style="width: 100%;"
                      @change="changeTime"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="结课日期" prop="endTime" required>
                <el-col :span="12">
                  <el-form-item prop="endTime">
                    <el-date-picker
                      type="date"
                      :picker-options="endDate"
                      placeholder="请选择日期"
                      v-model="Form.endTime"
                      style="width: 100%;"
                      @change="changeTime"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitFormWhole('Form')">添加课程</el-button>
              </el-form-item>
            </el-form>

            <transition name="el-zoom-in-top">
              //动态效果
              <div style="text-align: center; margin-top:80px;" v-show="show">
                <span style="font-size: 40px; color: #409EFF;">
                  课程添加完成
                  <br />
                </span>
                <i
                  class="el-icon-circle-check"
                  style="margin-top:15px; margin-bottom:100px;font-size: 40px; color: #409EFF;"
                ></i>
              </div>
            </transition>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!-- </el-card>
    <Footer />-->
  </div>
</template>

<script>
import * as courseAPI from "@/APIs/course";
import * as FT from "@/tools/frontTool";

export default {
  name: "Addcourse",
  //   components: {
  //     Navigator,
  //     Footer,
  //   },
  data() {
    return {
      //startDate: {},
      //endDate: {},
      tempName: [],
      dialogTableVisible: false,

      courseEntity: {
        // userId: this.$store.state.userId,
        course_name: "",
        profession: "",
        course_intro: "",
        start_time: "",
        end_time: "",
        courseId: "",
        rule: "",
      },
      page: 0,
      show: false,
      userId: this.$store.state.userId,
      expertId: "",
      Form: {
        courseTitle: "",
        courseMajor: "",
        courseIntro: "",
        startTime: "",
        endTime: "",
        afterTime:"2099",
      },

      rules: {
        courseTitle: [
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
        courseMajor: [
          { required: true, message: "请输入课程所属专业", trigger: "blur" },
        ],
        courseIntro: [
          { required: true, message: "请输入课程简介", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请选择开课日期", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结课日期", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //this.getUserInfo();
    this.startDate = {
      disabledDate: (time) => {
          return (
                  time.getTime() < new Date()
          );
      },
    };
    this.endDate = {
      disabledDate: (time) => {
        return time.getTime() < new Date() || time.getTime() < this.Form.startTime
      },
    };
  },
  methods: {
    changeTime() {
      this.startDate = {
        disabledDate: (time) => {
          if(this.Form.endTime != null)
          {
            return (
                    time.getTime() > this.Form.endTime || time.getTime() < new Date()
            );
          }
          else
          {
            return time.getTime() < new Date()
          }
        },
      };
      this.endDate = {
        disabledDate: (time) => {
          return (
            time.getTime() < new Date() || time.getTime() < this.Form.startTime
          );
        },
      };
    },

    success() {
      if (this.page === 0) {
        this.page = 3;
        this.show = true;
        setTimeout("location.reload()", 2000);
      }
    },

    submitFormWhole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.courseEntity.teacher_id = this.$store.state.userId;
          this.courseEntity.course_name = this.Form.courseTitle;
          this.courseEntity.profession = this.Form.courseMajor;
          this.courseEntity.course_intro = this.Form.courseIntro;
          this.courseEntity.start_time = this.Form.startTime.Format("yyyy-MM-dd hh:mm:ss");
          this.courseEntity.end_time = this.Form.endTime.Format("yyyy-MM-dd hh:mm:ss");
          this.uploadPaper();
        } else {
          // eslint-disable-next-line no-console
          console.log("error submit!!");
          return false;
        }
      });
    },

    /*async getUserInfo() {
                this.expertId = this.$store.state.expertId;
            },*/

    async uploadPaper() {
      try {
        window.console.log(this.courseEntity);
        // 拼接后判断是否有英文单双引号，有的话弹报错消息并需要重新输入
        if (
          FT.CS(
            this.courseEntity.course_name +
              this.courseEntity.course_intro +
              this.courseEntity.profession
          )
        ) {
          this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
          return;
        }
        const temp = await courseAPI.addCourse(this.courseEntity);
        const ifSuc = temp.data.msg;
        if (ifSuc === "success") {
          this.success();
        } else {
          this.$message.error("添加课程失败，请联系管理员");
        }
      } catch (e) {
        this.$message.error("添加课程失败，请联系管理员");
      }
    },
  },
};
</script>

<style>
.All {
  text-align: left;
}

.el-row {
  margin-bottom: 10px;
}

.el-col {
  border-radius: 4px;
}

.bg-top {
  background: rgba(255, 255, 255, 0.7);
}

.bg-white {
  background: rgba(255, 255, 255, 0.7);
}

.font-top {
  font-size: 25px;
  font-family: "微软雅黑", serif;
  text-align: left;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

#card {
  width: 100%;
  margin-top: 100px;
}
</style>
