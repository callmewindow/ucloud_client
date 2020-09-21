<template>
  <video id="video-player" controls @play="sendStartTime" @pause="sendPauseTime"></video>
</template>

<script>
export default {
  name: "VideoPlayer",
  methods: {
    sendStartTime() {
      let startTime = new Date();
      this.$emit("startPlay", startTime);
    },

    sendPauseTime() {
      let pauseTime = new Date();
      this.$emit("pausePlay", pauseTime);
    },
  },
};
</script>

<style scoped>
</style>

