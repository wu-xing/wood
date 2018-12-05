<template>
  <div class="container">
    <div class="article-exist-dog" v-if="!!article">
      <div class="article-encryption-dog" v-if="!isEncryption()">
        <ArticlePreview ref="preview" :html="getPreviewHtml()" />

        <ArticlePreviewOperationTools :foucsedArticleId="article.id" />
      </div>

      <div class="unlock-area" v-if="isEncryption()">
        <form v-on:submit="onUnlock($event);">
          <input name="木记" type="text" value="木记" style="display: none" />
          <input
            name="wood-article-password"
            type="password"
            placeholder="输入密码解锁"
            autocomplete="off"
            v-on:keyup.enter="handleUnlock($event);"
            v-model="lockPassword"
          />
        </form>
      </div>
    </div>

    <div v-if="!article">empty</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticlePreview from './ArticlePreview.vue';
import ArticlePreviewOperationTools from './ArticlePreviewOperationTools.vue';
import { LockServiceInstance } from '../service/lock';
import * as org from 'orgpr';

@Component({
  components: {
    ArticlePreviewOperationTools,
    ArticlePreview
  }
})
export default class ArticlePreviwWorkContainer extends Vue {
  @Prop() public article: Article;
  public isLock = true;
  public lockPassword: string = '';

  public isEncryption() {
    return this.article && this.article.isEncryption && this.isLock;
  }

  getPreviewHtml() {
    return this.parseOrgCode(this.article.content);
  }

  handleUnlock(event: Event) {
    event.preventDefault();
    this.isLock = LockServiceInstance.unlock(this.lockPassword);
  }

  public parseOrgCode(code: string): string {
    const parser = new org.Parser();
    const orgDocument = parser.parse(code);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    return orgHTMLDocument.toString();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  width: 70%;
}

.article-exist-dog {
  height: 100%;
}

.article-encryption-dog {
  height: 100%;
}

.unlock-area {
  background-color: #f8f8f8;
  position: absolute;
  height: 200px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.unlock-area input {
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  font-size: 16px;
  padding: 6px 12px;
  margin-top: -10px;
  text-align: center;
}
</style>
