<template>
  <div class="actor-item">
    <el-avatar shape="square" fit="cover" :size="70" :src="avatar"></el-avatar>
    <div>{{ name }}</div>
    <i class="el-icon-error" @click="deleteActor()"></i>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "avatar"],
  data() {
    return {};
  },
  methods: {
    // 删除演员接口
    deleteActor() {
      // 通知父组件，点击了删除---子传父
      // 主动触发在父组件中监听的delete事件
      this.$emit("delete");
    },
  },
};
</script>

<style scoped>
.actor-item {
  display: inline-block;
  margin: 20px 20px 0 0;
  text-align: center;
  position: relative;
}
.actor-item:hover i {
  display: block;
}
.actor-item i {
  position: absolute;
  font-size: 1.2em;
  top: -6px;
  right: -6px;
  display: none;
}
.actor-item div {
  font-size: 0.9em;
}
/* 穿透.el-avatar >>> img，style中有scoped */
/* the >>> and /deep/ combinators have been deprecated. Use :deep() instead */
.el-avatar :deep() img {
  width: 100%;
}
</style>