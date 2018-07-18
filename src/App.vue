<template>
  <div id="app">
    <nav v-bind:class="{ hide: hideMenu }">
      <ul>
        <li>
          <router-link to="/">
            <i class="el-icon-tickets"></i>
            列表
          </router-link>
        </li>

        <li>
          <router-link to="/create">
            <i class="el-icon-edit-outline"></i>
            新建
          </router-link>
        </li>
      </ul>
    </nav>

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
</style>

<style scoped>
nav {
  transition: margin-top ease-in-out 200ms;
  color: white;
  background-color: #333;
}

nav ul {
  margin: 0;
  padding: 0;
  display: block;
  text-align: left;
}

nav ul li {
  color: white;
  display: inline-block;
}

nav ul li a {
  color: white;
  text-decoration: none;
}
</style>
