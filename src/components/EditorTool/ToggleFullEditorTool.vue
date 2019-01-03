<template>
   <div v-on:click="handleClick();">
    <el-tooltip
      class="item"
      effect="dark"
      v-bind:content="!hiddenPreview ? '隐藏预览' : '显示预览'"
      placement="right"
      >
        <as-icon name="columns" style="color: #777"></as-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ToggleFullEditorTool extends Vue {
  @Prop() hiddenPreview!: boolean;
  handleClick() {
    this.$emit('hiddenPreview', !this.hiddenPreview);
  }
}
</script>

<style scoped></style>
