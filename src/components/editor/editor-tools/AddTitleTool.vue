<template>
  <li v-on:click="handleClick();">
    <el-tooltip class="item" effect="dark" content="标题" placement="bottom" v-bind:open-delay="1000">
      <as-icon name="heading" style="color: #777"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AddTitleTool extends Vue {
  handleClick() {
    this.$emit('action', {
      content: `#+TITLE: \n#+AUTHOR:\n`,
      position: 'BEGIN'
    });
  }
}
</script>

<style scoped>
</style>
