<template>
  <li v-on:click="handleClick();">
    <el-tooltip class="item" effect="dark" content="行内代码" placement="right">
      <as-icon name="terminal" style="color: #777"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AddInlineCodeTool extends Vue {
  handleClick() {
    this.$emit('action', {
      content: '= [code] =',
      position: 'CURRENT'
    });
  }
}
</script>

<style scoped></style>
