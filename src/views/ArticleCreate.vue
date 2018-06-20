<template>
  <div>
    <OrgModeEditor
      v-on:change="onChange"
      v-on:save="onSave"
      v-bind:document="document" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import axios from 'axios';
import router from '../router';
import OrgModeEditor from '@/components/OrgModeEditor.vue';

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
  }

  public onSave() {
    if (this.saved) {
      return;
    }
    this.saved = true;
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
        this.$store.commit('articles', resp.data);
        router.push({
          name: 'edit',
          params: {
            id: resp.data.id
          }
        });
      })
      .catch(() => {
        Message({
          message: 'Add article failure.',
          type: 'error'
        });
      }).finally(() => {
        this.saved = false;
      });
  }
}
</script>
