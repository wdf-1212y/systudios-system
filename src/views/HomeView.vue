<template>
  <div>
    <!-- 页面的主体结构 -->
    <el-container>
      <el-header class="header">森语影城后台管理系统
        <div class="userInfo" v-if="$store.state.user">
          {{$store.state.user.nickname}}
          <span @click="logout()">[注销]</span>
        </div>
        <div class="userInfo" v-else>
          未登录
        </div>
      </el-header>
      <el-container>
        <el-aside class="scroll-container aside" width="200px">
          <!-- 垂直导航 -->
          <el-menu router
          unique-opened
          :default-active="$route.path"
          style="border-right:none;"
          background-color="#333" text-color="#ddd" active-text-color="#fff">
            <el-submenu index="actor">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">演员管理</span>
              </template>
              <el-menu-item index="/home/actor-list">
                <span>演员列表</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
              <el-menu-item index="/home/actor-add">
                <span>新增演员</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="director">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">导演管理</span>
              </template>
              <el-menu-item index="/home/director-list">
                <span>导演列表</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
              <el-menu-item index="/home/director-add">
                <span>新增导演</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="movie">
              <template slot="title">
                <i class="el-icon-video-camera-solid"></i>
                <span slot="title">电影管理</span>
              </template>
              <el-menu-item index="/home/movie-list">
                <span>电影列表</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
              <el-menu-item index="/home/movie-add">
                <span>新增电影</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="cinema">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">电影院管理</span>
              </template>
              <el-menu-item index="/home/cinema-list">
                <span>电影院列表</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
              <el-menu-item index="/home/cinema-add">
                <span>新增电影院</span>
                <i class="el-icon-menu"></i>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <!-- 嵌套路由，匹配二级路由 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default{
  methods: {
    logout() {
      // 调用vuex的方法注销用户信息
      this.$store.commit('clearUserState')
      this.$router.push('/user/login')
    },
  },
}
</script>


<style scoped>
.header {
  background-color: #333;
  color: #fff;
  line-height: 60px;
  font-size: 1.3em;
}
.aside {
  background-color: #333;
  height: calc(100vh - 60px);
}
.main{
  height: calc(100vh - 60px);
}
.el-menu-item.is-active{
  font-weight: bold;
}
.userInfo{
  color: white;
  float: right;
  font-size: 16px;
  user-select: none;
}
.userInfo span:hover{
  color: #999;
  cursor: pointer;
}
</style>