<template>
  <div v-on:click="handleGoEdit();">
    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
      <as-icon name="edit" size="25" style="padding-left: 3px;"></as-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GoEditOperation extends Vue {
  @Prop()
  public foucsedArticleId!: string;

  public handleGoEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
