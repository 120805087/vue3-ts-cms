<template>
  <h2>{{ $store.state.name }}</h2>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <router-link to="/login">登录</router-link>
  <router-link to="/main">主页</router-link>
  <router-view></router-view>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
