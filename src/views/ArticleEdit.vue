<template>
  <div>
    <OrgModeEditor
      v-on:save="onSave"
      v-model="content" />
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
  public content: string = '';

  public onSave() {
    axios
      .post('/api/auth/article', {
        content: this.content
      })
      .then(resp => {
        console.log(resp);
      });
  }
}
</script>
