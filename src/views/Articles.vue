<template>
  <div>

    <aside>
      <ul v-if="articles.length">
        <li v-bind:key="article.id" v-for="article in articles">
          {{article.content}}
        </li>
      </ul>
    </aside>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Editor extends Vue {
  articles: any[];

  public created() {
    this.getArticles();
  }

  async getArticles() {
    const userId = window.localStorage.getItem('userId');
    const resp = await axios.get(`/api/auth/articles?userId=${userId}`);
    this.articles = resp.data;
  }
}
</script>
