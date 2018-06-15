<template>
  <div>
    <OrgModeEditor
      v-on:save="onSave"
      v-model="document" />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrgModeEditor from '@/components/OrgModeEditor.vue';
import axios from 'axios';

@Component({
  components: {
    OrgModeEditor
  }
})
export default class ArticleEdit extends Vue {
  public document: any = {content: '', title: ''};
  private saved: boolean = false;

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
        console.log(resp);

      })
      .catch(() => {
        this.saved = false;
      });
  }
}
</script>
