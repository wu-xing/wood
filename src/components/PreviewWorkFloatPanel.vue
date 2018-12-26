<template>
  <div class="preview-work-float-panel">
    <div class="icon-container">
      <as-icon name="poll-h" size="18"></as-icon>
    </div>
    <div class="panel-container">
      <div class="panel-inner-container">
        <div class="article-info">
          <div>icon title</div>
          <div>创建时间:</div>
          <div>最后修改时间:</div>
          <div>分享链接</div>
        </div>
        <ul>
          <GoEditOperation :foucsedArticleId="foucsedArticleId" />
          <HistoryOperation :foucsedArticleId="foucsedArticleId" />
          <LockOperation :foucsedArticleId="foucsedArticleId"/>
          <DownloadOperation :foucsedArticleId="foucsedArticleId" />
          <ShareOperation :foucsedArticleId="foucsedArticleId" />
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HistoryOperation from './ArticleOperations/ArticleHistorysOperation.vue';
import GoEditOperation from './ArticleOperations/ArticleGoEditOperation.vue';
import DownloadOperation from './ArticleOperations/ArticleDownloadOperation.vue';
import ShareOperation from './ArticleOperations/ArticleShareOperation.vue';
import LockOperation from './ArticleOperations/ArticleLockOperation.vue';

@Component({
  components: {
    HistoryOperation,
    GoEditOperation,
    DownloadOperation,
    ShareOperation,
    LockOperation
  }
})
export default class PreviewWorkFloatPanel extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview-work-float-panel {
  position: absolute;
  right: 0;
  top: 0;
}

.preview-work-float-panel:hover .panel-container {
  display: block;
}

.panel-container {
  opacity: 1;
}

.panel-container ul {
  margin: 0;
  padding: 0;
}
</style>
