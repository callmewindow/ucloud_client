<template>
  <div id="una">
    <div id="nameName">{{name}}</div>
    <el-tag id="nameTag" type="success" v-if="text" size="small" effect="dark">{{text}}</el-tag>
  </div>
</template>

<script>
export default {
  name: "Username",
  props: {
    name: String,
    text: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* #una {
  border: 1px solid black;
} */
#nameName{
  margin-top: 1px;
  float:left
}
#nameTag{
  margin-top: 0px;
  margin-left: 3px;
}
</style>
