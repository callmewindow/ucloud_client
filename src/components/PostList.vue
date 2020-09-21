<template>
  <div style="margin-bottom: 20px;">
    <el-card>
      <!--圈子规则-->
      <div slot="header">
        圈子规则
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          v-if="rule_edit===false"
          @click="edit_rule"
        >编辑规则</el-button>
        <el-button
          style="float: right; padding: 3px 3px"
          type="text"
          v-if="rule_edit"
          @click="edit_rule"
        >取消</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          v-if="rule_edit"
          @click="send_edit"
        >保存</el-button>
      </div>
      <!--规则内容-->
      <div style="margin-left: 15%;margin-right: 15%">
        <div v-if="!rule_edit">{{ rule_content }}</div>
        <el-input
          v-if="rule_edit"
          type="textarea"
          maxlength="200"
          show-word-limit
          v-model="rule_content_bk"
        ></el-input>
      </div>
      <!--发帖按钮-->
      <el-row :gutter="10" style="margin-top: 20px" v-if="rule_edit===false">
        <el-col :span="12" :offset="1">
          <el-input
            placeholder="搜索帖子"
            prefix-icon="el-icon-search"
            v-model="search_keyword"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search_post">搜索帖子</el-button>
          <el-button
            type="primary"
            v-if="display_search_result"
            @click="display_search_result=false;"
          >返回</el-button>
        </el-col>
        <el-col :span="2">
          <el-button id="sendBtn" type="primary" icon="el-icon-edit" @click="showSendUp = true">发帖</el-button>
        </el-col>
      </el-row>

      <el-col style="height:42px;line-height:42px" v-if="$store.state.permission !== 2" :span="8" :offset="1">当前积分：{{this.point}}</el-col>
    </el-card>
    <!--没帖子-->
    <el-card v-if="!havePost" style="margin-top: 20px;">目前圈子暂无帖子或未开启</el-card>
    <!--帖子列表-->
    <div v-if="havePost && !display_search_result" style="margin-top: 20px">
      <!--      全部/精华标签栏-->
      <el-tabs v-model="tab_active_name" type="card">
        <el-tab-pane label="　全部　" name="0"></el-tab-pane>
        <el-tab-pane label="　精华　" name="1"></el-tab-pane>
        <el-tab-pane label="学习讨论" name="2"></el-tab-pane>
        <el-tab-pane label="课程链接" name="3"></el-tab-pane>
        <el-tab-pane label="资源分享" name="4"></el-tab-pane>
      </el-tabs>
      <!--      全部帖子-->
      <div v-if="tab_active_name==='0'">
        <el-card v-for="post in post_list" :key="post.id" style="margin-bottom: 20px;">
          <el-row style="margin-top: 10px; margin-left: 5px">
            <el-col :span="2" style="text-align: center;">
              <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
            </el-col>

            <el-col :span="22">
              <el-row style="margin-bottom: 10px">
                <el-col :span="12">
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 20px;margin-bottom: 5px"
                    @click="showDetail(post.id)"
                  >{{ post.title }}</el-link>
                  <el-tag
                    type="primary"
                    size="medium"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.topped === 1"
                  >置顶</el-tag>
                  <el-tag
                    type="warning"
                    size="medium"
                    color="rgb(255,215,0)"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.stared === 1"
                  >精华</el-tag>
                  <el-tag
                    type="info"
                    size="small"
                    v-if="post.tag!==''"
                    style="margin-left: 5px;"
                  >{{ post.tag }}</el-tag>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div v-if="post.teacher_identity === '2'" style="float: left">
                      <Username :name="post.nickname" text="教师" />
                    </div>
                    <div v-if="post.teacher_identity !== '2'" style="float: left">
                      <Username :name="post.nickname" text />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="5"
                >发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
                <el-col :span="2">阅读:{{ post.read }}</el-col>
                <el-col :span="2">喜欢:{{ post.like }}</el-col>
              </el-row>

              <el-row style="margin-bottom: 10px">
                <el-col :span="18">{{ post.content|cut }}</el-col>
                <el-col :span="6" v-if="has_permission">
                  <el-button
                    type="text"
                    style="padding: 0;color: #F56C6C"
                    @click="delete_post(post.id)"
                  >删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 0"
                    @click="top_post(post.id)"
                  >设为置顶</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 1"
                    @click="cancel_top_post(post.id)"
                  >取消置顶</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 0"
                    @click="star_post(post.id)"
                  >设为精华</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 1"
                    @click="cancel_star_post(post.id)"
                  >取消精华</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!--      精华帖子-->
      <div v-if="tab_active_name==='1'">
        <el-card v-for="post in post_list_1" :key="post.id" style="margin-bottom: 20px;">
          <el-row style="margin-top: 10px; margin-left: 5px">
            <el-col :span="2" style="text-align: center;">
              <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
            </el-col>

            <el-col :span="22">
              <el-row style="margin-bottom: 10px">
                <el-col :span="12">
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 20px;margin-bottom: 5px"
                    @click="showDetail(post.id)"
                  >{{ post.title }}</el-link>
                  <el-tag
                    type="primary"
                    size="medium"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.topped === 1"
                  >置顶</el-tag>
                  <el-tag
                    type="warning"
                    size="medium"
                    color="rgb(255,215,0)"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.stared === 1"
                  >精华</el-tag>
                  <el-tag
                    type="info"
                    size="small"
                    v-if="post.tag!==''"
                    style="margin-left: 5px;"
                  >{{ post.tag }}</el-tag>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div v-if="post.teacher_identity === '2'" style="float: left">
                      <Username :name="post.nickname" text="教师" />
                    </div>
                    <div v-if="post.teacher_identity !== '2'" style="float: left">
                      <Username :name="post.nickname" text />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="5"
                >发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
                <el-col :span="2">阅读:{{ post.read }}</el-col>
                <el-col :span="2">喜欢:{{ post.like }}</el-col>
              </el-row>

              <el-row style="margin-bottom: 10px">
                <el-col :span="18">{{ post.content|cut }}</el-col>
                <el-col :span="6" v-if="has_permission">
                  <el-button
                    type="text"
                    style="padding: 0;color: #F56C6C"
                    @click="delete_post(post.id)"
                  >删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 0"
                    @click="top_post(post.id)"
                  >设为置顶</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 1"
                    @click="cancel_top_post(post.id)"
                  >取消置顶</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 0"
                    @click="star_post(post.id)"
                  >设为精华</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 1"
                    @click="cancel_star_post(post.id)"
                  >取消精华</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!--      学习讨论-->
      <div v-if="tab_active_name==='2'">
        <el-card v-for="post in post_list_2" :key="post.id" style="margin-bottom: 20px;">
          <el-row style="margin-top: 10px; margin-left: 5px">
            <el-col :span="2" style="text-align: center;">
              <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
            </el-col>

            <el-col :span="22">
              <el-row style="margin-bottom: 10px">
                <el-col :span="12">
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 20px;margin-bottom: 5px"
                    @click="showDetail(post.id)"
                  >{{ post.title }}</el-link>
                  <el-tag
                    type="primary"
                    size="medium"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.topped === 1"
                  >置顶</el-tag>
                  <el-tag
                    type="warning"
                    size="medium"
                    color="rgb(255,215,0)"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.stared === 1"
                  >精华</el-tag>
                  <el-tag
                    type="info"
                    size="small"
                    v-if="post.tag!==''"
                    style="margin-left: 5px;"
                  >{{ post.tag }}</el-tag>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div v-if="post.teacher_identity === '2'" style="float: left">
                      <Username :name="post.nickname" text="教师" />
                    </div>
                    <div v-if="post.teacher_identity !== '2'" style="float: left">
                      <Username :name="post.nickname" text />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="5"
                >发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
                <el-col :span="2">阅读:{{ post.read }}</el-col>
                <el-col :span="2">喜欢:{{ post.like }}</el-col>
              </el-row>

              <el-row style="margin-bottom: 10px">
                <el-col :span="18">{{ post.content|cut }}</el-col>
                <el-col :span="6" v-if="has_permission">
                  <el-button
                    type="text"
                    style="padding: 0;color: #F56C6C"
                    @click="delete_post(post.id)"
                  >删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 0"
                    @click="top_post(post.id)"
                  >设为置顶</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 1"
                    @click="cancel_top_post(post.id)"
                  >取消置顶</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 0"
                    @click="star_post(post.id)"
                  >设为精华</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 1"
                    @click="cancel_star_post(post.id)"
                  >取消精华</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!--      课程链接-->
      <div v-if="tab_active_name==='3'">
        <el-card v-for="post in post_list_3" :key="post.id" style="margin-bottom: 20px;">
          <el-row style="margin-top: 10px; margin-left: 5px">
            <el-col :span="2" style="text-align: center;">
              <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
            </el-col>

            <el-col :span="22">
              <el-row style="margin-bottom: 10px">
                <el-col :span="12">
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 20px;margin-bottom: 5px"
                    @click="showDetail(post.id)"
                  >{{ post.title }}</el-link>
                  <el-tag
                    type="primary"
                    size="medium"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.topped === 1"
                  >置顶</el-tag>
                  <el-tag
                    type="warning"
                    size="medium"
                    color="rgb(255,215,0)"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.stared === 1"
                  >精华</el-tag>
                  <el-tag
                    type="info"
                    size="small"
                    v-if="post.tag!==''"
                    style="margin-left: 5px;"
                  >{{ post.tag }}</el-tag>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div v-if="post.teacher_identity === '2'" style="float: left">
                      <Username :name="post.nickname" text="教师" />
                    </div>
                    <div v-if="post.teacher_identity !== '2'" style="float: left">
                      <Username :name="post.nickname" text />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="5"
                >发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
                <el-col :span="2">阅读:{{ post.read }}</el-col>
                <el-col :span="2">喜欢:{{ post.like }}</el-col>
              </el-row>

              <el-row style="margin-bottom: 10px">
                <el-col :span="18">{{ post.content|cut }}</el-col>
                <el-col :span="6" v-if="has_permission">
                  <el-button
                    type="text"
                    style="padding: 0;color: #F56C6C"
                    @click="delete_post(post.id)"
                  >删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 0"
                    @click="top_post(post.id)"
                  >设为置顶</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 1"
                    @click="cancel_top_post(post.id)"
                  >取消置顶</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 0"
                    @click="star_post(post.id)"
                  >设为精华</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 1"
                    @click="cancel_star_post(post.id)"
                  >取消精华</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!--      资源分享-->
      <div v-if="tab_active_name==='4'">
        <el-card v-for="post in post_list_4" :key="post.id" style="margin-bottom: 20px;">
          <el-row style="margin-top: 10px; margin-left: 5px">
            <el-col :span="2" style="text-align: center;">
              <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
            </el-col>

            <el-col :span="22">
              <el-row style="margin-bottom: 10px">
                <el-col :span="12">
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 20px;margin-bottom: 5px"
                    @click="showDetail(post.id)"
                  >{{ post.title }}</el-link>
                  <el-tag
                    type="primary"
                    size="medium"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.topped === 1"
                  >置顶</el-tag>
                  <el-tag
                    type="warning"
                    size="medium"
                    color="rgb(255,215,0)"
                    effect="dark"
                    style="margin-left: 5px;"
                    v-if="post.stared === 1"
                  >精华</el-tag>
                  <el-tag
                    type="info"
                    size="small"
                    v-if="post.tag!==''"
                    style="margin-left: 5px;"
                  >{{ post.tag }}</el-tag>
                </el-col>
                <el-col :span="3">
                  <div>
                    <div v-if="post.teacher_identity === '2'" style="float: left">
                      <Username :name="post.nickname" text="教师" />
                    </div>
                    <div v-if="post.teacher_identity !== '2'" style="float: left">
                      <Username :name="post.nickname" text />
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="5"
                >发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
                <el-col :span="2">阅读:{{ post.read }}</el-col>
                <el-col :span="2">喜欢:{{ post.like }}</el-col>
              </el-row>

              <el-row style="margin-bottom: 10px">
                <el-col :span="18">{{ post.content|cut }}</el-col>
                <el-col :span="6" v-if="has_permission">
                  <el-button
                    type="text"
                    style="padding: 0;color: #F56C6C"
                    @click="delete_post(post.id)"
                  >删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 0"
                    @click="top_post(post.id)"
                  >设为置顶</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.topped === 1"
                    @click="cancel_top_post(post.id)"
                  >取消置顶</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 0"
                    @click="star_post(post.id)"
                  >设为精华</el-button>
                  <el-button
                    type="text"
                    style="padding: 0"
                    v-if="post.stared === 1"
                    @click="cancel_star_post(post.id)"
                  >取消精华</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
    <!--搜索结果列表-->
    <div v-if="display_search_result">
      <el-card v-for="post in search_list" :key="post.id" style="margin-top: 20px;">
        <el-row style="margin-top: 10px; margin-left: 5px">
          <el-col :span="2" style="text-align: center;">
            <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
          </el-col>

          <el-col :span="22">
            <el-row style="margin-bottom: 10px">
              <el-col :span="12">
                <el-link
                  type="primary"
                  :underline="false"
                  style="font-size: 20px;margin-bottom: 5px"
                  @click="showDetail(post.id)"
                >{{ post.title }}</el-link>
                <el-tag
                  type="primary"
                  size="medium"
                  effect="dark"
                  style="margin-left: 5px;"
                  v-if="post.topped === 1"
                >置顶</el-tag>
                <el-tag
                  type="warning"
                  size="medium"
                  color="rgb(255,215,0)"
                  effect="dark"
                  style="margin-left: 5px;"
                  v-if="post.stared === 1"
                >精华</el-tag>
                <el-tag
                  type="info"
                  size="small"
                  v-if="post.tag!==''"
                  style="margin-left: 5px;"
                >{{ post.tag }}</el-tag>
              </el-col>
              <el-col :span="3">
                <div>
                  <div v-if="post.teacher_identity === '2'" style="float: left">
                    <Username :name="post.nickname" text="教师" />
                  </div>
                  <div v-if="post.teacher_identity !== '2'" style="float: left">
                    <Username :name="post.nickname" text />
                  </div>
                </div>
              </el-col>
              <el-col :span="5">发帖时间:{{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}</el-col>
              <el-col :span="2">阅读:{{ post.read }}</el-col>
              <el-col :span="2">喜欢:{{ post.like }}</el-col>
            </el-row>

            <el-row style="margin-bottom: 10px">
              <el-col :span="18">{{ post.content|cut }}</el-col>
              <el-col :span="6" v-if="has_permission">
                <el-button
                  type="text"
                  style="padding: 0;color: #F56C6C"
                  @click="delete_post(post.id)"
                >删除</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button
                  type="text"
                  style="padding: 0"
                  v-if="post.topped === 0"
                  @click="post.topped=1 ;top_post(post.id)"
                >设为置顶</el-button>
                <el-button
                  type="text"
                  style="padding: 0"
                  v-if="post.topped === 1"
                  @click="post.topped=0;cancel_top_post(post.id)"
                >取消置顶</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button
                  type="text"
                  style="padding: 0"
                  v-if="post.stared === 0"
                  @click="post.stared=1;star_post(post.id)"
                >设为精华</el-button>
                <el-button
                  type="text"
                  style="padding: 0"
                  v-if="post.stared === 1"
                  @click="post.stared=0;cancel_star_post(post.id)"
                >取消精华</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog title="发布帖子" id="sendUp" :visible.sync="showSendUp" width="30%">
      <SendPost />
    </el-dialog>

    <el-dialog id="detailUp" :visible.sync="showDetailUp" width="50%">
      <PostDetail :postId="detailId" />
    </el-dialog>
  </div>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as CourseAPI from "@/APIs/course";
import * as FT from "@/tools/frontTool";
import SendPost from "@/components/SendPost";
import PostDetail from "@/components/PostDetail";
import * as courseAPI from "@/APIs/course";
import Username from "@/components/Username";

export default {
  name: "PostList",
  props: {
    point: Number,
  },
  components: {
    SendPost,
    PostDetail,
    Username,
  },
  data() {
    return {
      FT,
      detailId: 0,
      havePost: false,
      post_list: [],
      showSendUp: false,
      showDetailUp: false,
      rule_edit: false,
      rule_content: "",
      rule_content_bk: "",
      search_keyword: "",
      search_list: [],
      post_list_1: [],
      post_list_2: [],
      post_list_3: [],
      post_list_4: [],
      display_search_result: false,
      tab_active_name: "0",
      has_permission: false,
    };
  },
  created() {
    console.log(this.point);
    this.get_post_list();
    this.getCourseBasicInfo();
    if (this.$store.state.permission !== 0) this.has_permission = true;
  },
  filters: {
    cut(str) {
      if (str && str.length > 40) str = str.slice(0, 40) + "...";
      return str;
    },
  },
  methods: {
    showDetail(postId) {
      this.detailId = postId;
      this.showDetailUp = true;
    },
    edit_rule() {
      this.rule_edit = !this.rule_edit;
      this.rule_content_bk = this.rule_content;
    },
    async send_edit() {
      if (FT.CS(this.rule_content_bk)) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      this.rule_edit = !this.rule_edit;
      this.rule_content = this.rule_content_bk;
      try {
        await postAPI.setForumRule(
          parseInt(this.$route.params.courseId),
          this.rule_content
        );
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async get_post_list() {
      let courseId = this.$route.params.courseId;
      try {
        const list = await postAPI.postList(parseInt(courseId));
        this.post_list = [];
        this.post_list_1 = [];
        this.post_list_2 = [];
        this.post_list_3 = [];
        this.post_list_4 = [];
        console.log(list);
        for (let i = 0; i < list.data.length; i++) {
          if (list.data[i].topped === 1) this.post_list.push(list.data[i]);
          if (list.data[i].stared === 1) this.post_list_1.push(list.data[i]);
          if (list.data[i].tag === "学习讨论")
            this.post_list_2.push(list.data[i]);
          if (list.data[i].tag === "课程链接")
            this.post_list_3.push(list.data[i]);
          if (list.data[i].tag === "资源分享")
            this.post_list_4.push(list.data[i]);
        }
        for (let i = 0; i < list.data.length; i++)
          if (list.data[i].topped === 0) this.post_list.push(list.data[i]);
        if (this.post_list.length > 0) {
          this.havePost = true;
        }
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async getCourseBasicInfo() {
      const temp = await CourseAPI.getCourseBasicInfo(
        this.$route.params.courseId,
        this.$store.state.userId
      );
      this.rule_content = temp.data.course.rule;
    },
    async search_post(e) {
      try {
        const list = await postAPI.searchPost(
          this.search_keyword,
          this.$route.params.courseId
        );
        this.search_list = list.data;
        this.display_search_result = true;
      } catch (e) {
        this.$message.error("请求超时");
      }
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    //（取消）置顶帖子
    async top_post(id) {
      try {
        await postAPI.topPost(parseInt(id));
        await this.get_post_list();
        this.$message({
          type: "success",
          message: "置顶成功!",
        });
      } catch (e) {
        this.$message.error("置顶请求超时");
      }
    },
    async cancel_top_post(id) {
      try {
        await postAPI.cancelTopPost(parseInt(id));
        await this.get_post_list();
      } catch (e) {
        this.$message.error("取消置顶请求超时");
      }
    },
    //（取消）加精帖子
    async star_post(id) {
      try {
        await postAPI.starPost(parseInt(id));
        await this.get_post_list();
        this.$message({
          type: "success",
          message: "加精成功!",
        });
      } catch (e) {
        this.$message.error("加精请求超时");
      }
    },
    async cancel_star_post(id) {
      try {
        await postAPI.cancelStarPost(parseInt(id));
        await this.get_post_list();
      } catch (e) {
        this.$message.error("取消加精请求超时");
      }
    },
    //删帖
    async delete_post(id) {
      this.$confirm("此操作将永久删除该帖, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await postAPI.deletePost(parseInt(id));
            await this.get_post_list();
            if (this.display_search_result) {
              const list = await postAPI.searchPost(
                this.search_keyword,
                this.$route.params.courseId
              );
              this.search_list = list.data;
            }
          } catch (e) {
            this.$message.error("删除请求超时");
          }
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
#sendBtn {
  float: right;
  margin-bottom: 10px;
}
</style>