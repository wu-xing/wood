<template>
  <div class="article-preview" v-html="html"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ArticlePreview extends Vue {
  @Prop() public html!: string;
}
</script>

<style>
.article-preview {
  margin: 0;
  padding: 0;
}

.article-preview h1 {
  color: #555;
  margin-top: 5px;
}

.article-preview img {
  max-width: 95%;
}
</style>
