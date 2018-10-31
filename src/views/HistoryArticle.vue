<template>
  <div class="page">
    <ArticlePreview
      ref="preview"
      :html="html"
      v-if="!!html"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as org from 'orgpr';
import ArticlePreview from '../components/ArticlePreview.vue';
import { parseOrgCode } from '../util/article';

@Component({
  components: {
    ArticlePreview
  }
})
export default class HistoryArticle extends Vue {
  public html: string = '';

  created() {
    this.getHistoryArticle();
  }

  getHistoryArticle() {
    const articleId = this.$route.params.articleId;
    const date = this.$route.params.date;
    axios.get(`/api/auth/article/${articleId}/history/${date}`).then(resp => {
      const { html, title } = parseOrgCode(resp.data);
      this.html = html;
    });
  }
}
</script>


<style scoped>
.page {
  overflow: auto;
}

.preview-container {
  max-width: 1000px;
  margin: auto;
  height: auto;
}
</style>
