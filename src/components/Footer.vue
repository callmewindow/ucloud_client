<template>
  <div>
    <div v-if="pos=='left'" class="footer footer-l">Copyright © 2020 Beacon</div>
    <div v-if="pos=='center'||!pos" class="footer">Copyright © 2020 Beacon</div>
    <div v-if="pos=='right'" class="footer footer-r">Copyright © 2020 Beacon</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    position: String,
  },
  data() {
    return {
      pos: this.position,
    };
  },
};
</script>

<style scoped>
.footer{
  width: 100%;
  height: 24px;
  line-height: 24px;
  color: #909399;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: fixed;
  bottom: 10px;
}
.footer-l{
  width: auto;
  left: 20px;
}
.footer-r{
  width: auto;
  right: 20px;
}
</style>
