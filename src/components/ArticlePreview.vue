<template>
  <div
    class="article-preview"
    v-bind:class="{ 'show-outline': showOutline }"
    v-html="html">
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
.article-preview {
  margin: 0;
  padding: 10px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  line-height: 1.1;
  letter-spacing: 1px;
}

.article-preview .outline {
  display: none;
}

.article-preview.show-outline .outline {
  display: block;
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
</style>
