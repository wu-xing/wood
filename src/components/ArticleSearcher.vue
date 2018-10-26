<template>
  <div>
    <el-input @input="handleInput"></el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ArticleSearcher extends Vue {
  /* @Prop() private msg: string; */

  public handleInput(searchStr: string) {
    this.$eventHub.$emit('searchStr', searchStr);
  }
}
</script>

<style scoped>
</style>
