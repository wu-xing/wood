<template>
  <div>
    <h1>401</h1>

    <a href="/signin">signin</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class ShareArticle extends Vue {

  getArticle() {
    const aritcleId = this.$route.params.id;
    axios.get(`/api/article/${aritcleId}`).then(resp => {
      const article = resp.data;
    });
  }

  created() {
    this.getArticle();
  }
}
</script>
