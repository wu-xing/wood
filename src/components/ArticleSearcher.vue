<template>
  <div class="article-seacher-container">
    <as-icon name="search"></as-icon>
    <el-input @input="handleInput"></el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ArticleSearcher extends Vue {

  public handleInput(searchStr: string) {
    // this.$eventHub.$emit('searchStr', searchStr);
    this.$store.dispatch('searchArticles', {searchStr});
  }
}
</script>

<style>
.article-seacher-container {
  position: relative;
  display: inline-block;
  max-width: 200px;
  margin-left: 150px;
}

.article-seacher-container .el-input input {
  height: 26px;
  border-radius: 13px;
  overflow: hidden;
  border: 1px solid #eee;
  padding: 8px 16px;
  padding-left: 36px;
}

.article-seacher-container .fa-icon {
  position: absolute;
  z-index: 20;
  left: 10px;
  top: 54%;
  transform: translate(0, -50%);
  color: #666;
}
</style>

