<template>
  <div class="article-preview" v-html="html"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticlePreview extends Vue {
  @Prop() public html!: string;
}
</script>

<style>
.article-preview {
  margin: 0;
  padding: 10px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  line-height: 1.1;
  font-family: pingfang, SourceSansPro;
}

.article-preview h1 {
  color: #555;
  margin-top: 5px;
}

.article-preview img {
  max-width: 95%;
  border-radius: 4px;
  overflow: hidden;
}

.article-preview pre {
  padding: 8px 8px;
  border-radius: 3px;
  border: 1px solid #eee;
}

code {
  font-family: Monaco;
  padding: 10px;
}
</style>
