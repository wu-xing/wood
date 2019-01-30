<template>
  <div><OrgModeEditor v-on:change="onChange" v-on:save="onSave" v-bind:document="document" /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import axios from 'axios';
import router from '../router';
import OrgModeEditor from '@/components/editor/OrgModeEditor.vue';

const DRAFT_KEY = 'CREATING_DRAFT';

@Component({
  components: {
    OrgModeEditor
  }
})
export default class ArticleEdit extends Vue {
  public document: any = { content: '', title: '' };
  private saved: boolean = false;

  created() {
    const creatingDraft = JSON.parse(<any>window.localStorage.getItem(DRAFT_KEY));
    this.document = creatingDraft || this.document;
  }

  onChange(document: any) {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(document));
    this.document = document;
  }

  public onSave() {
    if (this.saved) {
      return;
    }
    this.saved = true;
    const document = {
      content: this.document.content,
      title: this.document.title,
      createdAt: new Date().getTime()
    };
    axios
      .post('/api/auth/v2/article', document)
      .then(resp => {
        this.$store.commit('article', {
          id: resp.data.id,
          ...document
        });
        this.saved = false;
        window.localStorage.removeItem(DRAFT_KEY);
        router.push({
          name: 'article',
          params: {
            id: resp.data.id
          }
        });
      })
      .catch(error => {
        Message({
          message: 'Add article failure.',
          type: 'error'
        });
        this.saved = false;
      });
  }
}
</script>
