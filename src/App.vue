<template>
  <div id="app">
    <el-menu
      v-bind:class="{ hide: hideMenu }"
      class="el-menu"
      mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">
          <i class="el-icon-tickets"></i>
          列表
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/create">
          <i class="el-icon-edit-outline"></i>
          新建
        </router-link>
      </el-menu-item>
    </el-menu>

    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  public hideMenu = false;

  created() {
    this.$eventHub.$on('full-screen', () => {
      this.hideMenu = !this.hideMenu;
    });
  }
}
</script>


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

<style scoped>
.el-menu {
  transition: margin-top ease-in-out 200ms;
}
.el-menu.hide {
  margin-top: -61px;
}

.el-menu-item a {
  display: inline-block;
  height: 100%;
}
</style>
