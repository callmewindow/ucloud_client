<template>
  <div id="CL">
    <Navigator active-func="course" />
    <el-row :gutter="20" style="margin-left: 15%; margin-right: 15%">
      <el-col :span="16" style="margin-top: 80px;">
        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
          <el-select
            v-model="select"
            style="width: 90px;color:black;padding-left:10px"
            slot="prepend"
          >
            <el-option label="课 程" value="课程"></el-option>
            <el-option label="教 师" value="教师"></el-option>
          </el-select>
          <el-button slot="append" style="color:#409eff" icon="el-icon-search" @click="searchAll"></el-button>
        </el-input>
      </el-col>
      <el-col v-if="$store.state.teacherID === 2" :span="3" style="margin-top: 80px;float:right">
        <el-button type="primary" style="float: right" @click="showAddCourse = true">
          创建课程
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-col>
    </el-row>
    <!--    全部课程列表-->
    <el-row
      :gutter="20"
      style="margin-left: 15%; margin-right: 15%; padding-bottom:50px"
      v-if="!display_search_result"
    >
      <el-col
        :span="6"
        v-for="(course,index) in course_list"
        :key="index"
        style="margin-top: 20px;"
      >
        <el-card>
          <img src="@/assets/course-cover.png" style="width: 100%" />
          <el-row style="margin-top: 5px">
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 20px;height: 20px"
              @click="frontTool.toPath('/course/'+course.id)"
            >{{ course.course_name|cut_8 }}</el-link>
          </el-row>
          <el-row style="margin-top: 5px">开课：{{ course.start_time|cut }} 至 {{ course.end_time|cut }}</el-row>
          <el-row>
            <div style="float: left">教师：{{ course.teacher ? course.teacher.realname:'匿名'}}</div>
            <div style="float: right">学生人数：{{ course.student_number }}</div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--    搜索结果列表-->
    <el-row
      :gutter="20"
      style="margin-left: 15%; margin-right: 15%; padding-bottom:50px"
      v-if="display_search_result"
    >
      <el-card v-if="search_list.length == 0">暂无有关课程</el-card>
      <el-col
        :span="6"
        v-for="(course,index) in search_list"
        :key="index"
        style="margin-top: 20px;"
      >
        <el-card>
          <img src="@/assets/course-cover.png" style="width: 100%" />
          <el-row style="margin-top: 5px">
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 20px;height: 20px"
              @click="frontTool.toPath('/course/'+course.id)"
            >{{ course.course_name|cut_8 }}</el-link>
          </el-row>
          <el-row style="margin-top: 5px">
            <div>开课：{{ course.start_time|cut }} 至 {{ course.end_time|cut }}</div>
          </el-row>
          <el-row>
            <div style="float: left">教师：{{ course.teacher_name }}</div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showAddCourse" width="50%">
      <AddCourse />
    </el-dialog>
    <Footer />
  </div>
</template>

<script>
import * as courseAPI from "@/APIs/course.js";
import Navigator from "@/components/Navigator";
import AddCourse from "@/components/AddCourse";
import Footer from "@/components/Footer";
import * as frontTool from "@/tools/frontTool";

export default {
  name: "CourseList",
  components: {
    Navigator,
    Footer,
    AddCourse,
  },
  data() {
    return {
      frontTool,
      select: "课程",
      searchInput: "",
      showAddCourse: false,
      course_list: [],
      search_keyword: "",
      search_list: [],
      display_search_result: false,
    };
  },
  created() {
    //填充旧数据
    let oldUI = JSON.parse(localStorage.getItem("userinfo"));
    if (oldUI) {
      this.$store.state.email = oldUI.email;
      this.$store.state.nickname = oldUI.nickname;
      this.$store.state.permission = oldUI.permission;
      this.$store.state.teacherID = oldUI.teacherID;
      this.$store.state.userId = oldUI.userId;
    }
    this.get_course_list();
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
    async searchAll() {
      if (this.select === "课程") {
        this.search_keyword = this.searchInput;
        this.display_search_result = false;
        this.search_course();
      }
      if (this.select === "教师") {
        this.$message("教师检索功能开发中，敬请期待！");
      }
    },
    async get_course_list() {
      try {
        const list = await courseAPI.courseQuery();
        window.console.log(list);
        this.course_list = list.data.courses;
        this.course_list.reverse();
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async search_course() {
      try {
        const list = await courseAPI.searchCourse(this.search_keyword);
        this.search_list = list.data;
        this.display_search_result = true;
        console.log(list);
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
  },
};
</script>

<style scoped>
#CL {
  min-height: calc(100vh + 10px);
}
</style>