<template>
  <div>
    <el-button v-on:click="innerOnClick">新建笔记</el-button>

    <el-dialog
      title="选择笔记类型"
      width="400px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      hi    
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CreateArticleButton extends Vue {
  //   @Prop()
  //   public onClick!: Function;

  public dialogVisible = false;

  handleClose() {
    this.dialogVisible = false;
  }

  innerOnClick() {
    this.dialogVisible = true;
  }
}
</script>

<style scoped>
button {
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
