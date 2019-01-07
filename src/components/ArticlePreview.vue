<template>
  <div class="preview-container" v-bind:class="{ 'is-history': !!articleHistory }">
    <div class="history-info" v-if="!!articleHistory">{{ articleHistory.date }} 历史（不可编辑）</div>
    <div
      class="article-preview"
      v-bind:class="{
        'show-outline': showOutline,
        'hide-title': hideTitle
      }"
      v-html="html"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

declare var hljs: any;

@Component
export default class ArticlePreview extends Vue {
  @Prop() public html!: string;

  @Prop({ default: () => false })
  public showOutline!: boolean;

  @Prop({ default: () => false })
  public hideTitle: boolean;

  @Prop() public articleHistory!: any;

  updated(): void {
    this.hlCode();
  }

  hlCode(): void {
    this.$el.querySelectorAll('pre code').forEach(e => {
      hljs.highlightBlock(e);
    });
  }
}
</script>

<style>
.preview-container {
  text-align: left;
  padding: 10px;
}

.preview-container .history-info {
  overflow: hidden;
  margin-top: 10px;
  padding: 5px 20px;
  font-style: italic;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  border: 1px solid #eee;
}

.article-preview {
  margin: 0;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  line-height: 1.6;
  letter-spacing: 1px;
  padding-bottom: 50px;
}

.article-preview .outline {
  display: none;
}

.article-preview.show-outline .outline {
  display: block;
}

.article-preview.hide-title h1 {
  display: none;
}

.article-preview h1 {
  color: #555;
  margin-top: 5px;
}

.article-preview ul {
  list-style: none;
}

.article-preview li {
  margin-bottom: 3px;
}

.article-preview li a {
  display: inline-block;
  text-decoration: none;
}

.article-preview > ul {
  padding: 0;
}

.article-preview .section-number {
  margin-right: 8px;
  background-color: #666;
  border-radius: 2px;
  color: white;
  padding: 0 5px;
  box-sizing: border-box;
  display: inline-block;
  height: 80%;
}

.article-preview img {
  max-width: 95%;
  border-radius: 4px;
  overflow: hidden;
}

.article-preview pre {
}

code {
  padding: 8px 8px;
  border-radius: 3px;
  font-family: Monaco;
}

blockquote {
  font-style: italic;
}
</style>
