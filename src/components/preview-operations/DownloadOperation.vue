<template>
  <div v-on:click="handleDownloadZip()">
    <el-tooltip class="item" effect="dark" content="下载" placement="top">
      <as-icon name="file-archive" size="25" style="padding-left: 3px;"></as-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { extractImageUrls, replaceArticleImageUrl, extractUrlHash } from '../../util/article';
import { getBinaryContent } from '../../util/zip';
import { saveAs } from 'file-saver/FileSaver';
import * as JSZip from 'jszip';

@Component
export default class DownloadOperation extends Vue {
  @Prop()
  public foucsedArticleId!: string;

  public handleDownloadZip() {
    const zip = new JSZip();
    const articleTitle = this.$store.state.articles[this.foucsedArticleId].title;
    const articleContent = this.$store.state.articles[this.foucsedArticleId].content;

    const content: string = this.$store.state.articles[this.foucsedArticleId].content;
    const imageUrls: string[] = extractImageUrls(articleContent);

    zip.file(articleTitle + '.org', replaceArticleImageUrl(articleTitle, articleContent));

    Promise.all(imageUrls.map(getBinaryContent)).then(results => {
      if (imageUrls.length) {
        const assetsFolder = zip.folder(articleTitle);
        (<Array<{ binary: any; url: string }>>results).map((result: { binary: any; url: string }) => {
          assetsFolder.file(extractUrlHash(result.url), result.binary, { binary: true });
        });
      }
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, `${articleTitle}.zip`);
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
