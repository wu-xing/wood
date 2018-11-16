<template>
  <div class="preview-contaier">
    <div class="preview-contaier-toolbar">
      <ul class="preview-operation">

        <ArticleGoEditOperation :foucsedArticleId="foucsedArticleId" />

        <ArticleHistoryOperation :foucsedArticleId="foucsedArticleId" />

        <ArticleLockOperation :foucsedArticleId="foucsedArticleId"/>

        <ArticleDownloadOperation :foucsedArticleId="foucsedArticleId" />

        <ArticleShareOperation :foucsedArticleId="foucsedArticleId" />

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import ArticleHistoryOperation from './ArticleOperations/ArticleHistorysOperation.vue';
import ArticleGoEditOperation from './ArticleOperations/ArticleGoEditOperation.vue';
import ArticleDownloadOperation from './ArticleOperations/ArticleDownloadOperation.vue';
import ArticleShareOperation from './ArticleOperations/ArticleShareOperation.vue';
import ArticleLockOperation from './ArticleOperations/ArticleLockOperation.vue';

@Component({
  components: {
    ArticleHistoryOperation,
    ArticleGoEditOperation,
    ArticleDownloadOperation,
    ArticleShareOperation,
    ArticleLockOperation
  }
})
export default class ArticlePreviewOperationTools extends Vue {
  @Prop() public foucsedArticleId!: string;
}
</script>

<style>
.preview-contaier {
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
</style>
