<template>
  <div>
    <div class="container-inner">
      <aside>
        <ArticleCategory />
      </aside>

      <aside class="article-list">
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


      <ArticlePreviwContainer :article="getFocustArticle()" />

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as values from 'ramda/src/values';
import * as sort from 'ramda/src/sort';
import * as compose from 'ramda/src/compose';
import ArticlePreviwContainer from '../components/ArticlePreviwContainer.vue';
import ArticleCategory from '../components/ArticlesCategoary.vue';
import { LockServiceInstance } from '../service/lock';
import format from 'date-fns/format';

@Component({
  components: {
    ArticlePreviwContainer,
    ArticleCategory
  }
})
export default class Articles extends Vue {
  public foucsedArticleId: string | null = null;
  public focusHistory: any = null;

  created() {
    this.getArticlesAndSave();
    this.foucsedArticleId = <any>window.localStorage.getItem('foucsedArticleId');
    window.document.title = `文章 | 木记`;
  }

  get articles() {
    return compose(
      sort((a: Article, b: Article) => (a.updatedAt || a.createdAt) < (b.updatedAt || b.createdAt)),
      values
    )(this.$store.state.articles);
  }

  public getArticlesAndSave() {
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/auth/articles?userId=${userId}`).then(resp => {
      this.$store.commit('articles', resp.data);

      if (!this.foucsedArticleId && this.articles[0]) {
        this.foucsedArticleId = this.articles[0].id;
      }
    });
  }

  public getFocustArticle(): Article {
    const article = this.articles.find((a: Article) => a.id === this.foucsedArticleId);
    return article;
  }



  public formatDate(date: number): string {
    return format(date, 'YYYY/MM/dd');
  }

  public onArticleItemClick(article: Article) {
    this.foucsedArticleId = article.id;
    window.localStorage.setItem('foucsedArticleId', <any>article.id);
  }

}
</script>

<style scoped>
.container-inner {
  display: flex;
  height: 100%;
}

.article-list {
  width: 35%;
  max-width: 300px;
  border-right: 1px solid #f8f8f8;
  overflow-y: auto;
}

.article-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-list li {
  padding-left: 20px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #f8f8f8;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
}

.article-list li.active {
  background-color: #e8e8e8;
}

.article-list li:hover {
  background-color: #f8f8f8;
}

.article-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 3px;
  font-weight: bolder;
  color: #612e00;
}

.article-date {
  font-size: 12px;
  margin-top: 3px;
}

.unlock-area {
  background-color: #f8f8f8;
  position: absolute;
  height: 200px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.unlock-area input {
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  font-size: 16px;
  padding: 6px 12px;
  margin-top: -10px;
  text-align: center;
}
</style>


<style>
.vdp-datepicker__calendar {
  margin: 0 auto;
  border: 0;
  transform: scale(1.1, 1.1);
}
</style>
