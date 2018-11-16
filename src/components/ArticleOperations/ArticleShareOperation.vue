<template>
  <li v-on:click="handleShare()">
    <el-tooltip class="item" effect="dark" content="分享" placement="right">
      <as-icon name="share" size="25" style="color: #8b4647; padding-left: 3px;"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class ArticleShareOperation extends Vue {
  @Prop() public foucsedArticleId!: string;

  public handleShare() {
    const host = window.location.hostname;
    const protocol = location.protocol;
    const port = location.port;
    const url = `${protocol}//${host}${port === '80' || !port ? '' : ':' + port}/p/${this.foucsedArticleId}`;

    // TODO 报错
    // TODO 成功才提示
    axios.post(`/api/auth/article/share/${this.foucsedArticleId}`).then(() => {});
    this.$alert(`<a href=${url} target="_blank">${url}</a>`, '已生成分享链接(此文章已被公开)', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
