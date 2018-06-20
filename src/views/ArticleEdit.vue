<template>
  <div>
    <OrgModeEditor
      v-on:change="onChange"
      v-model="document" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import axios from 'axios';
import router from '../router';
import OrgModeEditor from '@/components/OrgModeEditor.vue';

@Component({
  components: {
    OrgModeEditor
  }
})
export default class ArticleEdit extends Vue {
  private saved: boolean = false;

  get document() {
    const id = this.$route.params.id;
    return (<any>this.$store).articles[id];
  }

  created() {
    /* const storeArticle = this.state.articles[id]; */
  }

  public onChange(document: any) {
    axios
      .post('/api/auth/article', {
        content: this.document.content,
        title: this.document.title
      })
      .then(resp => {
        Message({
          message: 'Add article successful.',
          type: 'success'
        });
        router.push({
          name: 'edit',
          params: {
            id: resp.data.id
          }
        });
      });
  }
}
</script>
