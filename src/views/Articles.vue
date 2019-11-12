<template>
  <div class="container-inner">
    <AppNavAside />

    <aside class="article-list" v-loading="$store.state.getArticlesLoading">

      <div>
        <CreateArticleButton />
      </div>

      <ul v-if="!!articles">
        <li
          v-on:click="onArticleItemClick(article);"
          v-bind:key="article.id"
          v-bind:class="{ active: foucsedArticleId === article.id }"
          v-for="article in articles"
        >
          <div class="left"><as-icon v-if="article.isEncryption" name="lock" scale="0.75" style=""></as-icon></div>
          <div class="right">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-date">{{ formatDate(article.updatedAt) }}</div>
          </div>
        </li>
      </ul>
    </aside>

    <ArticlePreviwWorkContainer v-if="getFocustArticle()" :article="getFocustArticle()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as map from 'ramda/src/map';
import * as sort from 'ramda/src/sort';
import * as compose from 'ramda/src/compose';
import ArticlePreviwWorkContainer from '../components/ArticlePreviwWorkContainer.vue';
import CreateArticleButton from '../components/CreateArticleButton.vue';
import AppNavAside from '../components/AppNavAside.vue';
import format from 'date-fns/format';

@Component({
  components: {
    ArticlePreviwWorkContainer,
    CreateArticleButton,
    AppNavAside
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
    const boxId = this.$store.state.currentBoxId;
    const box = this.$store.state.boxs[boxId];
    if (!box || !box.articleIds) {
      return null;
    }
    return compose(
      sort((a: Article, b: Article) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
      map((id: string) => this.$store.state.articles[id])
    )(this.$store.state.boxs[boxId].articleIds);
  }

  public getArticlesAndSave() {
    const boxId = this.$store.state.currentBoxId;
    const userId = window.localStorage.getItem('userId');
    this.$store.dispatch('getArticles', {
      userId,
      boxId
    });
  }

  public getFocustArticle(): Article | null {
    if (!this.articles) {
      return null;
    }
    const article = this.articles.find((a: Article) => a.id === this.foucsedArticleId);
    return article;
  }

  public formatDate(date: number): string {
    return format(date, 'yyyy/MM/dd');
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
  background-color: #555;
}

.article-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-list li {
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #4c4c4c;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
}

.article-list li .left {
  padding-top: 7px;
  width: 20px;
  display: flex;
  color: #bbb;
  justify-content: center;
  flex-shrink: 0;
}

.article-list li .right {
  width: 90%;
  flex-grow: 0;
}

.article-list li.active {
  background-color: #469777;
}

.article-list li:hover {
  background-color: #469777;
}

.article-title {
  color: #eee;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 3px;
  cursor: pointer;
}

.article-date {
  color: #ccc;
  font-size: 12px;
  margin-top: 3px;
}
</style>

<style>
.vdp-datepicker__calendar {
  margin: 0 auto;
  border: 0;
  transform: scale(1.1, 1.1);
}
</style>
