<template>
  <li v-on:click="handleGoEdit()">
    <el-tooltip class="item" effect="dark" content="编辑" placement="right">
      <as-icon name="edit" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticleGoEditOperation extends Vue {
  @Prop() public foucsedArticleId: string;

  public handleGoEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
