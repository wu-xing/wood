<template>
  <div class="category-switcher">
    <as-icon name="book" size="25" style=""></as-icon>
    <span class="category-switcher-name">未分类</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CategorySwitcher extends Vue {}
</script>

<style scoped>
.category-switcher {
  display: inline-block;
  padding: 0px 7px 3px 0px;
  cursor: pointer;
  color: #46a0fc;
}
.category-switcher-name {
  font-size: 13px;
  vertical-align: middle;
}

.category-switcher svg {
  vertical-align: middle;
  margin-right: 2px;
}
</style>
