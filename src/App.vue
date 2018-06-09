<template>
  <div id="app">

    <el-menu class="el-menu" mode="horizontal">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">
        <router-link to="/editor">编辑器</router-link>
      </el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>

    <router-view/>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
