<template>
  <div id="app" v-bind:class="{ hide: hideMenu, 'in-editting': inEditting }">
    <!-- <nav>
      <img class="logo" alt="logo" src="/logo.png" />

      <ul>
        <li>
          <router-link to="/"> <as-icon name="list-alt"></as-icon> </router-link>
        </li>

        <li>
          <router-link to="/create"> <as-icon name="plus-square"></as-icon> </router-link>
        </li>
      </ul>

      <ArticleSearcher />
    </nav> -->

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ArticleSearcher from './components/ArticleSearcher.vue';

@Component({
  components: {
    ArticleSearcher
  }
})
export default class App extends Vue {
  public hideMenu = false;
  public inEditting = false;

  @Watch('$route')
  watchRouter() {
    if (this.$route.name === 'share-article' || this.$route.name === 'signin' || this.$route.name === 'signup') {
      this.hideMenu = true;
    } else {
      this.hideMenu = false;
    }

    if (this.$route.name === 'article-edit') {
      this.inEditting = true;
    } else {
      this.inEditting = false;
    }
  }

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
  overflow: hidden;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'brown', -apple-system, BlinkMacSystemFont, 'avenir', 'lucida grande', 'gill sans', 'helvetica neue',
    'helvetica', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-items: stretch;
  position: relative;
  overflow: hidden;
}

#app > div {
  height: calc(100% - 37px);
  flex-grow: 1;
  flex-shrink: 2;
  flex-basis: auto;
  position: relative;
}

#app.in-editting nav {
  background-color: white;
  box-shadow: 0 0 5px #e8e8e8;
}

#app.hide nav {
  display: none;
}

* {
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
nav {
  height: 40px;
  transition: all ease-in-out 200ms;
  color: white;
  background-color: #333;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

nav .logo {
  height: 20px;
  width: 20px;
  margin-left: 12px;
  margin-right: 6px;
  border-radius: 3px;
}

nav ul {
  margin: 0;
  display: block;
  text-align: left;
  position: relative;
  padding: 0;
  margin-left: 8px;
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
  padding: 0 2px;
  box-shadow: 0 1px 3px #999;
}

nav ul li:hover svg {
  color: #47b784;
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
  margin-top: -3px;
  color: #666;
  transition: all 100ms ease-in-out;
}
</style>
