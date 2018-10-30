<template>
  <div class="container">
    <ul>
      <li>默认</li>
      <li>搜索：“{{searchStr}}”</li>
    </ul>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticleCategory extends Vue {
  searchStr: string = '';

  created() {
    this.$eventHub.$on('searchStr', (searchStr: string) => {
      this.searchStr = searchStr;
    });
  }
}
</script>

<style scoped>
.container {
  width: 180px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding-left: 20px;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #f8f8f8;
  height: 50px;
  line-height: 48px;
}

li:hover {
  background-color: #f8f8f8;

}

a {
  color: #42b983;
}
</style>
