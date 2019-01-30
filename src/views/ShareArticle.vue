<template>
  <div class="page"><ArticlePreview ref="preview" :html="html" v-if="!!html" /></div>
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
export default class ShareArticle extends Vue {
  public html: string = '';

  getArticle() {
    const articleId = this.$route.params.id;
    axios.get(`/api/v2/share/article/${articleId}`).then(resp => {
      const article = resp.data;

      const { html, title } = parseOrgCode(article);
      this.html = html;

      window.document.title = `${title} | 木记`;
    });
  }

  created() {
    this.getArticle();
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
