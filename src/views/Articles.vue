<template>
  <div>
    <div class="container-inner">
      <aside>
        <ul v-if="articles.length">
          <li v-on:click="onArticleItemClick(article)"
              v-bind:key="article.id"
              v-bind:class="{ active: foucsedArticleId === article.id }"
              v-for="article in articles">
            <div class="article-title">
              {{article.title}}
            </div>
            <div class="article-date">
              {{formatDate(article.updatedAt || article.createdAt)}}
            </div>
          </li>
        </ul>
      </aside>

      <div class="preview-contaier">
        <div class="preview-contaier-toolbar">
          <ul class="preview-operation">
            <li v-on:click="goEdit()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="edit" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="openHistoryCalendarModal()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="history" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="lockArticle()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="lock" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
          </ul>
        </div>

        <ArticlePreview
          ref="preview"
          v-if="articles.find(a => a.id === foucsedArticleId)"
          :html="parseOrgCode(articles.find(a => a.id === foucsedArticleId).content)"
        />

        <div class="unlock-area" v-if="isEncryption()">
          <input name="" type="text" value="" placeholder="输入密码" />
        </div>
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
import * as sort from 'ramda/src/sort';
import * as compose from 'ramda/src/compose';
import ArticlePreview from '../components/ArticlePreview.vue';

@Component({
  components: {
    ArticlePreview
  }
})
export default class Editor extends Vue {
  public foucsedArticleId: number | null = null;
  public isLock = true;

  get articles() {
    return compose(
      sort((a: Article, b: Article) => (a.updatedAt || a.createdAt) < (b.updatedAt || b.createdAt)),
      values
    )(this.$store.state.articles);
  }

  goEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }

  public created() {
    this.getArticles();
    this.foucsedArticleId = <any>window.localStorage.getItem('foucsedArticleId');
  }

  isEncryption() {
    if (!this.foucsedArticleId) {
      return false;
    }
    return (
      this.$store.state.articles[this.foucsedArticleId] &&
      this.$store.state.articles[this.foucsedArticleId].isEncryption &&
      this.isLock
    );
  }

  openHistoryCalendarModal() {
    /* axios.get(`/api/auth/article/3/history`).then(resp => {
     *   console.log(resp);
     * }); */
  }

  lockArticle() {
    axios.post(`/api/auth/article/encryption/${this.foucsedArticleId}`).then(() => {});
  }

  public formatDate(date: number): string {
    return format(date, 'YYYY/MM/dd');
  }

  public getArticles() {
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/auth/articles?userId=${userId}`).then(resp => {
      this.$store.commit('articles', resp.data);

      if (!this.foucsedArticleId && this.articles[0]) {
        this.foucsedArticleId = this.articles[0].id;
      }
    });
  }

  public onArticleItemClick(article: Article) {
    this.foucsedArticleId = article.id;
    window.localStorage.setItem('foucsedArticleId', <any>article.id);
  }

  public parseOrgCode(code: string): string {
    const parser = new org.Parser();
    const orgDocument = parser.parse(code);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    return orgHTMLDocument.toString();
  }
}
</script>

<style scoped>
.container-inner {
  display: flex;
  height: 100%;
}

aside {
  width: 35%;
  max-width: 300px;
  border-right: 1px solid #f8f8f8;
  overflow-y: auto;
}

aside ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

aside li {
  padding-left: 20px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #f8f8f8;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
}

aside li.active {
  background-color: #e8e8e8;
}

aside li:hover {
  background-color: #f8f8f8;
}

.article-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 3px;
  font-weight: bolder;
  color: #333;
}

.article-date {
  font-size: 12px;
  margin-top: 3px;
}

.preview-contaier {
  height: 100%;
  width: 100%;
  text-align: left;
  overflow-y: auto;
}

.preview-contaier:hover .preview-contaier-toolbar {
  opacity: 1;
}

.preview-contaier-toolbar {
  position: absolute;
  right: 10px;
  top: 0;
  /* opacity: 0; */
}

.preview-contaier-toolbar ul {
  list-style: none;
  margin: 5px;
}

.preview-operation li {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0 2px 10px #ccc;
  background-color: white;
  margin-bottom: 10px;
}

.preview-operation li svg {
  height: 20px;
  width: auto;
}

.unlock-area {
  background-color: #999;
  position: absolute;
  height: 200px;
  width: 40%;
  top: 0;
}
</style>
