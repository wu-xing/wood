<template>
  <div v-on:click="handleLockArticle();">
    <el-tooltip class="item" effect="dark" content="加锁" placement="top">
      <as-icon name="lock" size="25" style="padding-left: 3px;"></as-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class LockOperation extends Vue {
  @Prop() public foucsedArticleId!: string;

  public handleLockArticle() {
    axios.post(`/api/auth/v2/article/encryption/${this.foucsedArticleId}`).then(() => {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
