<template>
  <div>
    <OrgModeEditor
      is-edit
      v-bind:articleId="$route.params.id + ''"
      :waitPush="waitPush"
      v-on:change="onChange"
      v-bind:document="document"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import axios from 'axios';
import router from '../router';
import OrgModeEditor from '@/components/OrgModeEditor.vue';
import { Subject } from 'rxjs';
import { switchMap, debounceTime, tap } from 'rxjs/operators';

@Component({
  components: {
    OrgModeEditor
  }
})
export default class ArticleEdit extends Vue {
  private saved: boolean = false;
  private sync$: Subject<void> = new Subject();
  private uploadingContent?: string;
  private waitPush = false;

  get document(): ArticleDocument {
    const id: string = this.$route.params.id;
    return this.$store.state.articles[id];
  }

  created() {
    const userId = window.localStorage.getItem('userId');
    this.$store.dispatch('getArticles', {
      userId,
      boxId: '@DEFAULT'
    });

    this.sync$
      .pipe(
        tap(() => {
          this.waitPush = true;
        }),
        debounceTime(1000),
        switchMap(() => {
          this.waitPush = false;
          this.uploadingContent = this.document.content;
          return axios.put(`/api/auth/v2/article/${this.$route.params.id}`, {
            ...this.document
          });
        })
      )
      .subscribe();
  }

  mounted() {
    window.addEventListener('beforeunload', this.onBeforeunload);
  }

  destroyed() {
    window.removeEventListener('beforeunload', this.onBeforeunload);
  }

  public onBeforeunload = (event: Event) => {
    return '确认离开吗?';
  };

  public onChange(document: ArticleDocument) {
    this.$store.commit('articleMidifiy', {
      id: this.$route.params.id,
      ...document
    });
    this.sync$.next();
  }
}
</script>
