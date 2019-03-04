<template>
  <li v-on:click="handleClick();">
    <el-tooltip
      class="item"
      effect="dark"
      v-bind:content="editorPreviewShow ? '隐藏预览' : '显示预览'"
      placement="bottom"
      v-bind:open-delay="1000"
    >
      <as-icon name="columns" style="color: #777"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ToggleFullEditorTool extends Vue {
  handleClick() {
    this.$store.commit('editorPreviewShow', !this.editorPreviewShow);
  }

  get editorPreviewShow() {
    return this.$store.state.editorPreviewShow;
  }
}
</script>

<style scoped>
</style>
