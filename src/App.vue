<template>
  <div id="app" v-bind:class="{ hide: hideMenu }">
    <nav>
      <ul>
        <li>
          <router-link to="/">
            <as-icon name="list-alt"></as-icon>
          </router-link>
        </li>

        <li>
          <router-link to="/create">
            <as-icon name="plus-square"></as-icon>
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

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  position: relative;
}

#app > div {
  height: calc(100% - 37px);
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: auto;
  position: relative;
}

#app.hide nav {
  display: none;
}
</style>

<style scoped>
nav {
  transition: margin-top ease-in-out 200ms;
  color: white;
  background-color: #333;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  /* height: 37px; */
  flex: none;
  display: block;
}

nav ul {
  margin: 0;
  padding: 7px 10px;
  display: block;
  text-align: left;
}

nav ul li {
  color: white;
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 3px;
  margin-right: 10px;
  background-color: #f8f8f8;
  box-sizing: border-box;
  height: 20px;
  box-shadow: 0 1px 6px #999;
}

nav ul li a {
  color: white;
  padding: 0px 8px;
  text-decoration: none;
  display: inline-block;
  height: 100%;
  width: 100%;
  color: #333;
  box-sizing: border-box;
}

nav ul li a svg {
  vertical-align: middle;
  margin-top: -6px;
}
</style>
