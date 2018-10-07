<template>
  <div>
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

@Component({
  components: {
    ArticlePreview
  }
})
export default class ShareArticle extends Vue {
  public html: string = '';

  getArticle() {
    const aritcleId = this.$route.params.id;
    axios.get(`/api/share/article/${aritcleId}`).then(resp => {
      const article = resp.data;

      const parser = new org.Parser();
      const orgDocument = parser.parse(article.content);
      const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
      });
      this.html = orgHTMLDocument.toString();

      window.document.title = `${orgHTMLDocument.title} | 木记`;
    });
  }

  created() {
    this.getArticle();
  }
}
</script>


<style scoped>
.preview-container {
  max-width: 1000px;
  margin: auto;
}
</style>
