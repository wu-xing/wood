<template>
  <div class="header-container">
    <div>
      <CategorySwitcher />
    </div>
    <h1>{{ article.title }}</h1>
  
    <div class="under-title-container">
      
      <div class="date-info">
        <span>创建日期 {{ formatDate(article.createdAt) }}</span> 
        <span>更新日期 {{ formatDate(article.updatedAt) }}</span> 
      </div>

      <div class="operator-container">
        <GoEditOperation :foucsedArticleId="article.id" />

        <HistoryOperation :foucsedArticleId="article.id" />

        <LockOperation :foucsedArticleId="article.id"/>

        <DownloadOperation :foucsedArticleId="article.id" />

        <ShareOperation :foucsedArticleId="article.id" />
      </div>
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
import CategorySwitcher from '../CategorySwitcher.vue';

@Component({
  components: {
    HistoryOperation,
    GoEditOperation,
    DownloadOperation,
    ShareOperation,
    LockOperation,
    CategorySwitcher
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
  background-color: white;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

h1 {
  font-size: 20px;
  padding-bottom: 10px;
  margin: 4px 0 0px;
  height: 26px;
}

.date-info {
  font-size: 12px;
  color: #9f9f9f;
}

.date-info span:first-child {
  margin-right: 12px;
}

.operator-container {
  display: flex;
  justify-content: flex-end;
  color: #555;
}

.operator-container > div {
  cursor: pointer;
  margin-left: 5px;
}

.under-title-container {
  display: flex;
  justify-content: space-between;
}
</style>
