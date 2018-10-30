<template>
  <div class="hello">
    <ArticlePreview
      ref="preview"
      v-if="articles.find(a => a.id === foucsedArticleId) && !isEncryption()"
      :html="html"
    />

    <ArticlePreviewOperationTools
      :foucsedArticleId="foucsedArticleId"
    />

    <div class="unlock-area" v-if="isEncryption()">
      <form v-on:submit="onUnlock($event)">
        <input name="木记" type="text" value="木记" style="display: none" />
        <input
          name="wood-article-password"
          type="password"
          placeholder="输入密码解锁"
          autocomplete="off"
          v-on:keyup.enter="handleUnlock($event)"
          v-model="lockPassword" />
      </form>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticlePreview from './ArticlePreview.vue';

@Component({
  components: {
    ArticlePreview
  }
})
export default class ArticlePreviwContainer extends Vue {
  @Prop() public html!: string;

  public isEncryption() {
    if (!this.foucsedArticleId) {
      return false;
    }
    return (
      this.$store.state.articles &&
      this.$store.state.articles[this.foucsedArticleId] &&
      this.$store.state.articles[this.foucsedArticleId].isEncryption &&
      this.isLock
    );
  }

  handleUnlock(event: Event) {
    event.preventDefault();
    this.isLock = LockServiceInstance.unlock(this.lockPassword);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
