<template>
  <div class="article-seacher-container">
    <as-icon name="search"></as-icon>
    <el-input @input="handleInput"></el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({})
export default class ArticleSearcher extends Vue {
  searchStr$ = new Subject();

  constructor() {
    super();
    // TODO takeUntil
    this.searchStr$.pipe(filter(s => !!s), debounceTime(300)).subscribe((searchStr) => {
      this.$store.dispatch('searchArticles', {searchStr});
    });
  }

  public handleInput(searchStr: string) {
    // this.$eventHub.$emit('searchStr', searchStr);
    this.searchStr$.next(searchStr);
  }
}
</script>

<style>
.article-seacher-container {
  position: relative;
  display: inline-block;
  max-width: 200px;
  margin-left: 150px;
}

.article-seacher-container .el-input input {
  height: 26px;
  border-radius: 13px;
  overflow: hidden;
  border: 1px solid #eee;
  padding: 8px 16px;
  padding-left: 36px;
}

.article-seacher-container .fa-icon {
  position: absolute;
  z-index: 20;
  left: 10px;
  top: 54%;
  transform: translate(0, -50%);
  color: #666;
}
</style>

