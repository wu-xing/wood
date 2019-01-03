<template>
  <div class="header-container">
    <div>
      <h1>{{ article.title }}</h1>
      <div class="date-info">
        <span>创建日期 {{ formatDate(article.createdAt) }}</span> 
        <span>更新日期 {{ formatDate(article.updatedAt) }}</span> 
      </div>
    </div>

    <div>
      <ArticleGoEditOperation :foucsedArticleId="article.id" />

      <ArticleHistoryOperation :foucsedArticleId="article.id" />

      <ArticleLockOperation :foucsedArticleId="article.id"/>

      <ArticleDownloadOperation :foucsedArticleId="article.id" />

      <ArticleShareOperation :foucsedArticleId="article.id" />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import format from 'date-fns/format';
import ArticleHistoryOperation from '../ArticleOperations/ArticleHistorysOperation.vue';
import ArticleGoEditOperation from '../ArticleOperations/ArticleGoEditOperation.vue';
import ArticleDownloadOperation from '../ArticleOperations/ArticleDownloadOperation.vue';
import ArticleShareOperation from '../ArticleOperations/ArticleShareOperation.vue';
import ArticleLockOperation from '../ArticleOperations/ArticleLockOperation.vue';

@Component({
  components: {
    ArticleHistoryOperation,
    ArticleGoEditOperation,
    ArticleDownloadOperation,
    ArticleShareOperation,
    ArticleLockOperation
  }
})
export default class PreviewHeaderPanel extends Vue {
  @Prop() public article!: Article;

  public formatDate(date: number): string {
    return format(date, 'yyyy年MM月dd日');
  }
}
</script>

<style scoped>
.header-container {
  overflow: hidden;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

h1 {
  font-size: 20px;
  padding-bottom: 12px;
  
}

.date-info {
  font-size: 12px;
  color: #9f9f9f;
}

.date-info span:first-child {
  margin-right: 20px;
}
</style>
