<template>
  <div>
    <div class="container-inner">
      <aside>
        <ul v-if="articles.length">
          <li v-on:click="onArticleItemClick(article)"
              v-bind:key="article.id"
              v-for="article in articles">
            <div class="article-title">
              {{article.title}}
            </div>
            <div>
              {{formatDate(article.updatedAt || article.createdAt)}}
            </div>
          </li>
        </ul>
      </aside>

      <div class="preview-contaier">
        <div>
          <ul class="preview-operation">
            <li v-on:click="goEdit()">
              <el-tooltip class="item" effect="dark" content="Edit" placement="right">
                <i class="el-icon-document"></i>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <div v-html="articlePreviewHtml"></div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as org from 'orgpr';
import format from 'date-fns/format';
import * as values from 'ramda/src/values';

@Component({
  components: {}
})
export default class Editor extends Vue {
  public foucsedArticle: any;
  public articlePreviewHtml: string = '';

  get articles() {
    return values(this.$store.state.articles);
  }

  goEdit() {
    this.$router.push(`/article/${this.foucsedArticle.id}`);
  }

  public created() {
    this.getArticles();
  }

  public formatDate(date: number) {
    return format(date, 'YYYY/MM/dd');
  }

  public getArticles() {
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/auth/articles?userId=${userId}`).then(resp => {
      this.$store.commit('articles', resp.data);
    });
  }

  public onArticleItemClick(aritcle: any) {
    this.foucsedArticle = aritcle;
    const parser = new org.Parser();
    const orgDocument = parser.parse(aritcle.content);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    this.articlePreviewHtml = orgHTMLDocument.toString();
  }
}
</script>

<style scoped>
.container-inner {
  display: flex;
}

aside {
  padding-left: 20px;
  width: 35%;
  max-width: 300px;
}

aside ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

aside li {
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  height: 50px;
}

.article-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.preview-operation {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid #f0f0f0;
}

.preview-contaier {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
