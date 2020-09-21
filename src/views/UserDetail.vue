<template>
  <div>
    <Navigator active-func="user" />
    <div class="back">
      <!--            上层个人信息展示-->
      <el-card class="card align-center text-align: center;">
        <el-row :gutter="20" class="row-bg">
          <el-col :span="8" :offset="2">
            <div class="info-title">
              <i class="el-icon-user-solid"></i>
              <b style="margin-left: 5%">{{users.username}}</b>
            </div>
            <div class="info-content">学校：{{users.school?users.school:'暂未认证学校'}}</div>
            <div
              class="info-content"
              style="margin-top: 10px"
            >职称：{{users.major?users.major:'暂未填写职称'}}</div>
            <template>
              <el-button
                v-if="this.$store.state.teacherID===0||!this.$store.state.teacherID"
                class="button"
                style="width:100px"
                @click="showAuthUp = true"
              >申请教师认证</el-button>
              <el-tag
                v-if="this.$store.state.teacherID===1"
                style="cursor: pointer;margin-top:10px"
                size="mini"
                type="info"
                @click="showResUp = true"
              >认证审核中</el-tag>
              <el-tag
                v-if="this.$store.state.teacherID===2"
                style="cursor:pointer;margin-top:10px"
                size="mini"
                type="success"
                @click="showResUp = true"
              >已认证为教师用户</el-tag>
            </template>
          </el-col>
          <el-col :span="1" :offset="4">
            <i class="el-icon-edit-outline el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">加入课程数</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.circle}}个</div>
          </el-col>
          <el-col :span="1">
            <div style="font-size:30px; color: white;margin-top: 30px">|</div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-lollipop el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">总圈子积分</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.score}}分</div>
          </el-col>
          <el-col :span="1">
            <div style="font-size:30px; color: white;margin-top: 30px">|</div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-time el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">总学习时长</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.time}}</div>
          </el-col>
          <el-col :span="1">
            <el-button class="quitButton" @click="quitLogin">注销</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div
            class="info-content"
            style="float: right;margin-right:30%;margin-top: -2%"
          >学习时长将会实时进行更新</div>
        </el-row>
      </el-card>

      <el-tabs v-model="activeName" @tab-click="handleClick()" class="tab" style="size: 40px">
        <el-tab-pane label="课程" name="first">
          <el-switch
            v-model="value1"
            inactive-text="加入的课程"
            active-text="创建的课程"
            active-value="false"
          ></el-switch>
          <div style="margin-left: 5%" v-show="!value1">
            <el-row :gutter="100" style="margin-top: 20px ">
              <el-col :span="5" :offset="0" v-for="(o,index) in course" :key="index">
                <div style="min-width: 200px ;margin-bottom: 30px">
                  <div v-on: @mouseover="show(index)" @mouseleave="i=-1">
                    <el-card :body-style="{padding:'2px'}" shadow="hover" class="courseCard">
                      <!-- 退出课程按钮-->
                      <div
                        v-show="index === i"
                        @click.stop="clicktry()"
                        style="float: left;margin-left: 10px"
                      >
                        <el-dropdown @command="handleCommand">
                          <span
                            class="el-dropdown-link"
                            style="font-weight: bold;cursor:pointer"
                            @click="getcourse(o.course_id)"
                          >...</span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">退出课程</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <!--                                            课程信息详情-->
                      <div class="className" @click="jumpCourse(o.course_id)">{{o.course_name}}</div>
                      <el-tag
                        class="tag"
                        type="warning"
                        style="width: 60px"
                        v-show="o.profession"
                      >{{o.profession}}</el-tag>
                      <div class="classFrom info-content"></div>
                      <div v-show="index !==i" class="startime info-content">
                        <i class="el-icon-date"></i>
                        {{time(o.start_time)}}
                      </div>
                      <div v-show="index!==i" class="studentNum info-content">
                        <i class="el-icon-user"></i>
                        {{o.studentnum}}
                      </div>
                      <div v-show="index === i" class="classIntro">{{o.course_intro }}</div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style=" color: #797b80;float: left;margin-left: 5%;font-size: 12px"
                      >
                        <i class="el-icon-date"></i>
                        {{time(o.start_time)}}
                      </div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style="color: #797b80;float: right ;font-size: 12px"
                      >
                        <i class="el-icon-user"></i>
                        {{o.studentnum}}
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="margin-left: 5%" v-show="value1">
            <el-row :gutter="100" style="margin-top: 20px ">
              <el-col :span="5" :offset="0" v-for="(w,index) in makeCourse" :key="index">
                <div style="min-width: 200px ;margin-bottom: 30px">
                  <div v-on: @mouseover="show(index)" @mouseleave="i=-1">
                    <el-card :body-style="{padding:'2px'}" shadow="hover" class="courseCard">
                      <!-- 退出课程按钮-->
                      <div
                        v-show="index === i"
                        @click.stop="clicktry()"
                        style="float: left;margin-left: 10px"
                      >
                        <el-dropdown @command="handleCommand">
                          <span
                            class="el-dropdown-link"
                            style="font-weight: bold;cursor:pointer"
                            @click="getcourse(w.id)"
                          >...</span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="b">删除课程</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <!--                                            课程信息详情-->
                      <div class="className" @click="jumpCourse(w.id)">{{w.course_name}}</div>
                      <el-tag
                        class="tag"
                        type="warning"
                        style="width: 60px"
                        v-show="w.profession"
                      >{{w.profession}}</el-tag>
                      <div class="classFrom info-content"></div>
                      <div v-show="index !==i" class="startime info-content">
                        <i class="el-icon-date"></i>
                        {{time(w.start_time)}}
                      </div>
                      <div v-show="index!==i" class="studentNum info-content">
                        <i class="el-icon-user"></i>
                        {{w.studentnum}}
                      </div>
                      <div v-show="index === i" class="classIntro">{{w.course_intro }}</div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style=" color: #797b80;float: left;margin-left: 5%;font-size: 12px"
                      >
                        <i class="el-icon-date"></i>
                        {{time(w.start_time)}}
                      </div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style="color: #797b80;float: right ;font-size: 12px"
                      >
                        <i class="el-icon-user"></i>
                        {{w.studentnum}}
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="second">功能开发中...</el-tab-pane>
        <el-tab-pane label="好友" name="third">
          <div class="message">
            <el-row :gutter="30">
              <el-col :span="10">
                <el-card class="message_card">好友申请</el-card>
                <div style="overflow-y: scroll; height: 500px">
                  <div class="message_detail">
                    <div v-for="(p,index) in friendMessages" :key="index">
                      <el-card class="message_detail">
                        <div class="message_title">
                          <span class="message_title">
                            <b style="color: #409eff">{{p.user_nickname}}</b>
                            申请加你为好友
                            <div
                              style="float: right;color: #797b80;font-weight: bold;font-size: 13px"
                            >{{p.application_time}}</div>
                            <div class="message_content">{{p.application_content}}</div>
                            <el-button-group>
                              <el-button
                                class="confirm_button"
                                @click="p.result=1,confirmFriend(p.applicant_id)"
                                v-show="p.result===0"
                              >同意</el-button>
                              <el-button
                                class="confirm_button"
                                @click="p.result=2,rejectFriend(p.applicant_id)"
                                v-show="p.result===0"
                              >拒绝</el-button>
                            </el-button-group>
                            <el-button class="confirmed_button" v-show="p.result===1">已同意</el-button>
                            <el-button class="confirmed_button" v-show="p.result===2">已拒绝</el-button>
                          </span>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="14">
                <el-card class="message_card">好友列表</el-card>
                <div class="friendList">
                  <FriendList />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息中心" name="forth">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-card class="message_card">系统消息</el-card>
              <div style="overflow-y: scroll; height: 500px">
                <div v-for="(m,index) in messages" :key="index">
                  <el-card class="message_detail">
                    <el-row>
                      <el-col :span="1">
                        <el-badge is-dot class="dot_item" v-show="m.is_read===0"></el-badge>
                      </el-col>
                      <el-col :span="23">
                        <div class="message_title">{{m.message_title}};</div>
                      </el-col>
                    </el-row>
                    <div class="message_content">{{m.message_content}}</div>
                    <div class="message_time">
                      {{m.send_time?m.send_time.substring(0,19):'时间未知'}}
                      <el-button
                        v-if="m.is_read === 0"
                        @click="open2(m.id)"
                        class="button read_button"
                      >标为已读</el-button>
                      <div v-if="m.is_read === 1" disabled class="unread_button">已读</div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="line">|</div>
            </el-col>
            <el-col :span="11" v-if="$store.state.teacherID === 2">
              <el-card class="message_card">课程申请</el-card>
              <div style="overflow-y: scroll; height: 500px">
                <div class="message_detail">
                  <div v-for="(n,index) in courseMessages" :key="index">
                    <el-card class="message_detail">
                      <div class="message_title">
                        <span class="message_title">
                          <b
                            style="color: #409eff"
                          >{{n.user_info? n.user_info.user_nickname : '匿名' }}</b>
                          申请加入
                          <b
                            style="color: #409eff"
                          >{{n.course_info?n.course_info.course_name: '暂无课程名'}}</b>
                          课程
                          <div
                            style="float: right;color: #797b80;font-weight: bold;font-size: 13px"
                          >{{time(n.application_time)}}</div>
                          <div class="message_content"> </div>
                          <el-button-group v-show="n.result===0">
                            <el-button
                              class="reject_button"
                              @click="confirmCourse(n.id,n.user),n.result=1"
                            >同意</el-button>
                            <el-button
                              class="reject_button"
                              @click="rejectCourse(n.id,n.user),n.result=2"
                            >拒绝</el-button>
                          </el-button-group>
                          <el-button class="rejected_button" v-show="n.result===1">已同意</el-button>
                          <el-button class="rejected_button" v-show="n.result===2">已拒绝</el-button>
                        </span>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="教师认证申请" :visible.sync="showAuthUp" width="30%">
        <TeacherAuth />
      </el-dialog>
      <el-dialog title="教师认证信息" :visible.sync="showResUp" width="30%">
        <TeacherAuth status="result" />
      </el-dialog>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
import TeacherAuth from "@/components/TeacherAuth";
import FriendList from "@/components/FriendList";
import * as FT from "@/tools/frontTool";
import * as userAPI from "@/APIs/user.js";
import * as courseAPI from "@/APIs/course.js";
import * as noticeAPI from "@/APIs/notice.js";

export default {
  name: "UserDetail",
  components: { Navigator, Footer, TeacherAuth, FriendList },
  data() {
    return {
      FT,
      showResUp: false,
      showAuthUp: false,
      userId: this.$store.state.userId,
      nickname: this.$store.state.nickname,
      circleUrl: require("@/assets/useravatar.jpg"),
      users: {
        username: "烽火用户",
        userId: "BH17373109",
        identity: 0,
        school: "暂未认证学校信息",
        major: "暂未认证领域信息",
        circle: 0,
        score: 0,
        time: 0,
      },
      activeName: "first",
      seen: false,
      course_id: 1,
      sender_id: 1,
      current: 0,
      messageid: 2,
      value1: true,
      teachername: " 谭火彬",
      currentDate: new Date(),
      course: [
        {
          name: "软件工程实践",
          profession: "软件工程",
          teacher: "吕云翔",
          classIntro: "《软件工程实践》是软件工程本科专业的一门专业...",
          studentnum: "1",
          course_id: 50,
        },
        {
          name: "数据库",
          profession: "计算机",
          teacher: "黄坚",
          classIntro: "《数据库》是计算机本科专业的一门专业必修课。它是...",
          studentnum: "13",
          course_id: 12,
        },
      ],
      makeCourse: [],
      messages: [
        {
          message_title: "今晚5：30，WYX带你参观绿园",
          message_content:
            "CT、JYM、ZYM、JYH等将分享他们和绿园的故事，走过路过不要错过！",
          send_time: "2020-09-05 10:06:44",
          is_read: 0,
        },
        {
          message_title: "明早8：00，F111，每日站会",
          message_content:
            "THB、LGY、JJD将在线答疑。烽火平台在线为你直播，又是一个你不能错过的节目",
          send_time: "2020-09-06 11:06:44",
          is_read: 0,
        },
      ],
      courseMessages: [
        {
          courses: "软件工程实践",
          user: "LGY",
          result: 0,
          application_time: "2020-09-16",
          content: "233",
          id: 1,
        },
        {
          courses: "数据库",
          user: "THB",
          result: 0,
          application_time: "2020-09-13",
          content: "学习使我进步",
          id: 2,
        },
      ],
      acceptedMessages: [],
      rejectedMessages: [],
      unhandled_applications: [],
      friendMessages: [
        {
          application: "WHQ",
          application_content: "加个好友",
          application_time: "2020-09-16",
          app_result: 0,
        },
        {
          application: "YCZ",
          application_content: "感受原力吧",
          application_time: "2020-09-15",
          app_result: 0,
        },
      ],
      i: -1,
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
    // this.sendSystemMes();
    this.get_userDetail();
    this.get_userCourse();
    this.get_userMakeCourse();
    this.get_sysMsg();
    this.get_CourseApply();
    this.get_FriendApply();
  },
  filters: {
    filterIntro(value) {
      return value.substring(0, 30) + "...";
    },
  },
  methods: {
    jumpCourse(CID) {
      this.$router.push({ path: "/course/" + CID });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    quitLogin() {
      this.$confirm("是否确认退出当前账号", "退出登录", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          this.$message.success("已退出登录");
          this.$store.state.userId = -1;
          localStorage.removeItem("userinfo");
          this.$router.push({
            path: "/home",
          });
        })
        .catch(() => {});
    },

    show(index) {
      this.i = index;
    },
    //获取用户信息*
    get_userDetail() {
      this.userId = this.$store.state.userId;
      if (this.userId == -1) {
        this.$message.error("请登录后查看个人详情");
        FT.toPath("/Home");
      }
      userAPI.getUserDetail(this.userId).then((res) => {
        console.log(res);
        this.users.circle = res.data.user.course_number;
        this.users.username = res.data.user.nickname;
        this.users.school = res.data.user.school;
        this.users.major = res.data.user.profession;
        this.users.score = res.data.user.score;
        this.users.time = res.data.user.coursetime;
        this.users.school = res.data.user.school;
        this.$store.state.teacherID = res.data.user.teacher_identity;
        localStorage.setItem("userinfo", JSON.stringify(this.$store.state));
      });
    },

    clicktry() {},
    //获取用户加入的课程*
    get_userCourse() {
      courseAPI.getUserCourse(this.userId).then((res) => {
        // let str = '{"message": "OK", "courses": [{"course_name": "科技写作", "course_intro": "Ian", "start_time": datetime.datetime(2020, 9, 11, 5, 3, 33), "profession": "Ian", "studentnum": 2, "teachername": null}, {"course_name": "软工23", "course_intro": "没什么用23", "start_time": datetime.datetime(2020, 9, 11, 5, 3, 33), "profession": null, "studentnum": 1, "teachername": null}]}'
        console.log("11", res.data.courses);
        this.course = res.data.courses;
      });
    },
    //获取用户创建的课程*
    get_userMakeCourse() {
      courseAPI.getUserOwnerCourse(this.userId).then((res) => {
        console.log(23333, res);
        if (res.data.message === "该用户未创建任何课程。") {
          this.makeCourse = [];
        } else {
          this.makeCourse = res.data.course_list;
          this.teachername = res.data.teacher.realname;
        }
      });
    },

    time(s) {
      //  将截取后的时间return出来
      if (s) return s.substring(0, 10);
    },

    //退出课程*
    quitCourse(course_id) {
      courseAPI.deleteUserCourse(this.userId, course_id).then((res) => {
        this.get_userCourse();
      });
    },
    //获取course_id的工具函数*
    getcourse(course_id) {
      this.course_id = course_id;
    },
    //删除课程*
    deleteCourse(course_id) {
      courseAPI.deleteCourse(course_id).then((res) => {
        console.log(this.userId, course_id);
        this.get_userMakeCourse();
      });
    },
    //**
    handleCommand(command) {
      console.log("112");
      if (command == "a") {
        this.$alert("确定退出该课程吗", "退出课程", {
          confirmButtonText: "确定",
          callback: (action) => {
            if (action == "confirm") {
              this.quitCourse(this.course_id);
            }
          },
        });
      }
      if (command == "b") {
        this.$alert("确定删除该课程吗", "删除课程", {
          confirmButtonText: "确定",
          callback: (action) => {
            // this.$message({     type: 'info',     message: `action: ${ action }` });
            if (action == "confirm") {
              this.deleteCourse(this.course_id);
            }
          },
        });
      }
    },
    //获取所有课程申请++(user那里是user_id,不知道是不是nickname好一些/现在收不到数据)
    get_CourseApply() {
      courseAPI.getUserApply(this.$store.state.userId).then((res) => {
        console.log("66", res.data);
        if (res.data.message === "该用户尚未创建任何课程。") {
          this.courseMessages = [];
        } else {
          this.accptedMessages = res.data.accepted_applications;
          this.rejectedMessages = res.data.rejected_applications;
          this.unhandledMessages = res.data.unhandled_applications;
          let newarr = [
            ...this.unhandledMessages,
            ...this.accptedMessages,
            ...this.rejectedMessages,
          ];
          this.courseMessages = newarr;
          console.log("A", newarr);
        }
      });
    },
    //同意加入课程*(系统消息发送情况没测，现在看不到课程申请）
    confirmCourse(course_application_id, user_id) {
      this.$message({
        message: "已添加成员进入课程",
        type: "success",
      });
      courseAPI.Course(course_application_id).then((res) => {});
      courseAPI
        .systemMessages(user_id, "课程申请", "老师已经通过了你的申请")
        .then((res) => {
          console.log("C", res);
        });
    },
    //拒绝加入课程*(系统消息发送情况没测，现在看不到课程申请）
    rejectCourse(course_application_id, user_id) {
      this.$message({
        message: "拒绝成员进入课程",
        type: "success",
      });
      courseAPI.rejectCourse(course_application_id).then((res) => {});
      courseAPI
        .systemMessages(user_id, "课程申请", "老师拒绝了你的申请")
        .then((res) => {
          console.log("C", res);
        });
    },
    //获取所有好友申请++（（看上去差不多了））
    get_FriendApply() {
      userAPI.getFriendApplication(this.userId).then((res) => {
        if (res.data.result === "no friend application") {
          this.friendMessages = [];
        } else {
          this.friendMessages = res.data;
          this.friendMessages.reverse()
        }
        console.log("B", res.data);
      });
    },
    //同意添加好友++（看上去差不多了）
    confirmFriend(sender_id) {
      this.$message({
        message: "成功添加好友",
        type: "success",
      });
      userAPI.passFriend(sender_id, this.userId).then((res) => {});
      courseAPI
        .systemMessages(
          sender_id,
          "好友申请",
          this.nickname + "已经通过了你的好友申请"
        )
        .then((res) => {
          console.log("C", res);
        });
    },
    //拒绝添加好友（看上去差不多了）
    rejectFriend(sender_id) {
      this.$message({
        message: "已拒绝好友",
        type: "success",
      });
      userAPI.rejectFriend(sender_id, this.userId).then((res) => {});
      courseAPI
        .systemMessages(
          sender_id,
          "好友申请",
          this.nickname + "拒绝了你的好友申请"
        )
        .then((res) => {
          console.log("C", res);
        });
    },
    //发送系统消息（没用了，直接在同意拒绝里添加了）
    sendSystemMes() {
      courseAPI.systemMessages(1, "测试", "content内容").then((res) => {
        console.log("C", res);
      });
    },
    //获取系统消息
    get_sysMsg() {
      noticeAPI.getAllSysMsg(this.userId).then((res) => {
        this.messages = res.data.messages;
        if (this.messages) {
          this.messages.reverse();
        } else {
          this.messages = [];
        }
      });
    },
    //消息已读（messageid替换）
    open2(msgID) {
      this.$message({
        message: "消息已标为已读",
        type: "success",
      });
      courseAPI.readMessages(msgID).then((res) => {
        console.log("D", res);
        this.get_sysMsg();
      });
    },
    //获取系统消息（虚位以待）(messages的数组，但是在sortmessages中迭代)
  },
};
function sortByTime(array, key1, key2) {
  return array.sort(function (a, b) {
    var x = a[key1];
    var y = b[key1];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}
</script>

<style scoped>
.back {
  width: 100%;
  clear: both;
  background-color: #fffafa;
  height: 920px;
}

.card {
  margin-left: 6%;
  margin-right: 6%;
  background-image: linear-gradient(
    to left,
    rgba(255, 0, 0, 0.6),
    rgba(255, 165, 0, 0.7)
  );
}

.row-bg {
  margin-top: 5%;
}

.info-title {
  font-size: 20px;
  margin-top: 20px;
  font-family: 微软雅黑;
  font-weight: bold;
  color: white;
}

.info-content {
  margin-top: 8px;
  font-size: 13px;
  font-family: 微软雅黑;
  color: white;
}

.button {
  margin-top: 20px;
  margin-left: -3px;
  width: 60px;
  padding: 5px;
  background-color: #ffdead;
  color: #ff7256;
  -webkit-border-radius: 15px;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  font-weight: 900;
  font-size: 70%;
}

.el-icon {
  margin-top: 40px;
  color: white;
  font-size: xx-large;
}

.icon-content {
  font-family: 微软雅黑;
  font-size: 14px;
  color: white;
}

.tab {
  margin-top: 30px;
  margin-left: 90px;
  margin-right: 90px;
}

.el-tabs /deep/ .el-tabs__item.is-active {
  color: #ff7f00;
}

.el-tabs /deep/ .el-tabs__item {
  color: #363636;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;
}

.el-tabs /deep/ .el-tabs__active-bar {
  background-color: #ff7256;
}

.className {
  margin-top: 12%;
  font-size: 15px;
  font-family: 微软雅黑;
  font-weight: bold;
  float: inherit;
  cursor: pointer;
}

.classFrom {
  margin-top: 5%;
  clear: both;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: #797b80;
}

.studentNum {
  font-size: 12px;
  color: #797b80;
  float: right;
  margin-right: 5%;
  margin-top: 14%;
}

.startime {
  font-size: 12px;
  color: #797b80;
  float: left;
  margin-top: 14%;
  margin-left: 5%;
  display: block;
}

/deep/ .el-col-8 {
  width: 20%;
}

/deep/ .el-card {
  border: 0px white;
}

.courseCard {
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(244, 164, 96, 0)
  );
  width: 100%;
  text-align: center;
  height: 150px;
}

.classIntro {
  font-size: 12px;
  color: #797b80;
  float: left;
  margin-top: 8%;
  margin-left: 5%;
  margin-right: 5%;
  width: 180px;
  height: 29px;
}

.tag {
  background-color: #ff7256;
  color: white;
  font-weight: bolder;
  text-align: center;
  float: right;
  padding: 0 5px;
  margin-top: -24%;
}

.message {
  width: 1083px;
}

.message_card {
  color: #409eff;
  font-weight: bold;
  height: 60px;
  text-align: center;
}

.message_detail {
  height: auto;
  margin-top: 10px;
  padding: 0px;
}

.line {
  margin-left: 46%;
  width: 2px;
  height: 600px;
  background-color: #e4e7ed;
  font-size: xx-small;
  color: #e4e7ed;
}

.dot_item {
  margin-top: 4px;
  color: #409eff;
}

.message_title {
  font-weight: bold;
  color: #363636;
  font-size: 14px;
}

.message_content {
  margin-top: 10px;
  font-size: 13px;
  color: #696969;
  font-family: 微软雅黑;
}

.message_time {
  margin-top: 20px;
  font-size: 13px;
  color: #797b80;
  height: 10px;
}

/deep/ .el-badge__content {
  background-color: #409eff;
}

.read_button {
  background-color: #409eff;
  color: white;
  margin-left: 350px;
  margin-top: -30px;
}

.unread_button {
  border-radius: 5px;
  width: 40px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 13px;
  margin-left: 350px;
  margin-top: -30px;
  background-color: #797b80;
  color: white;
}

.reject_button {
  margin-left: 290px;
  background-color: #409eff;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.rejected_button {
  margin-left: 330px;
  background-color: #797b80;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.confirm_button {
  margin-left: 250px;
  background-color: #409eff;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.confirmed_button {
  margin-left: 280px;
  background-color: #797b80;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

::-webkit-scrollbar {
  width: 0px !important;
}

.delete_course {
  margin-top: -150px;
  margin-left: -200px;
  border-radius: 2px;
}
/deep/ .el-switch__label {
  color: #797b80 !important;
  font-weight: bold;
}
.quitButton {
  background-color: unset;
  border: solid white;
  color: white;
  padding: 8px;
  font-weight: bold;
  margin-left: 35px;
}

/deep/ .el-switch__label.is-active {
  color: #ff7256 !important;
  font-weight: bold;
}
/deep/.el-switch.is-checked .el-switch__core {
  border-color: #ff7256;
  background-color: #ff7256;
}

.friendList {
  overflow-y: scroll;
  height: 450px;
  margin-top: 10px;
}
</style>
