<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>导演管理</el-breadcrumb-item>
      <el-breadcrumb-item>导演列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.directorName" placeholder="请输入导演姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表页面 -->
    <el-divider content-position="left">导演列表</el-divider>
    
    <person-item 
    v-for="item in directorList" :key="item.id"
    :id="item.id" 
    :name="item.director_name"
    :avatar="item.director_avatar"
    @delete="onDelete(item.id)"></person-item>
  </div>
</template>

<script>
import PersonItem from '@/components/PersonItem.vue';
export default {
  components: { PersonItem },
  data() {
    return {
      directorList:null,  //绑定导演列表
      searchForm: {
        directorName:'',  //用于绑定导演名字
      },
    }
  },
  methods: {
    /**
     * 当点击搜索按钮时执行
     */
    onSearch() {
      // 如果填写内容为空或字符串
      if(!this.searchForm.directorName.trim()){
        this.loadDirectorList()
        return
      }
      // 发送请求，模糊查询导演列表
      let name=this.searchForm.directorName
      this.$http.DirectorApi.listByName({name}).then(res=>{
        console.log('模糊查询请求',res)
        if(res.data.code==200){
          this.directorList=res.data.data
        }
      })
    },
    // 加载导演列表
    loadDirectorList(){
      this.$http.DirectorApi.list({page:1,pagesize:100}).then(res=>{
        console.log('加载导演列表结果',res)
        if(res.data.code==200){
          this.directorList=res.data.data
        }
      })
    },
    // 监听PersonItem删除成功事件
    onDelete(id){
      this.$http.DirectorApi.delete({ id: id }).then((res) => {
        console.log("删除导演请求", res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.loadDirectorList();
        }
      });
    },
  },
  // 挂载完毕后执行的生命周期
  mounted() {
    // 加载导演列表
    this.loadDirectorList()
  },
};
</script>

<style scoped>
</style>