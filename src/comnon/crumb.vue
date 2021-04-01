<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{addr}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
    export default {
      name: "crumb",
      computed: {
        addr(){
          return this.$route.name
        }
      }
    }
</script>

<style scoped>

</style>
