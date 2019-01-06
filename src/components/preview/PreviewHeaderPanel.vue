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
      <GoEditOperation :foucsedArticleId="article.id" />

      <HistoryOperation :foucsedArticleId="article.id" />

      <LockOperation :foucsedArticleId="article.id"/>

      <DownloadOperation :foucsedArticleId="article.id" />

      <ShareOperation :foucsedArticleId="article.id" />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import format from 'date-fns/format';
import HistoryOperation from '../preview-operations/HistorysOperation.vue';
import GoEditOperation from '../preview-operations/GoEditOperation.vue';
import DownloadOperation from '../preview-operations/DownloadOperation.vue';
import ShareOperation from '../preview-operations/ShareOperation.vue';
import LockOperation from '../preview-operations/LockOperation.vue';

@Component({
  components: {
    HistoryOperation,
    GoEditOperation,
    DownloadOperation,
    ShareOperation,
    LockOperation
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
