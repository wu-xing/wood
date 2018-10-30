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
}

li {
  display: block;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a {
  color: #42b983;
}
</style>
