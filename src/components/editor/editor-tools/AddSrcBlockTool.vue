<template>
  <li v-on:click="handleClick();">
    <el-tooltip class="item" effect="dark" content="代码" placement="bottom" v-bind:open-delay="1000">
      <as-icon name="code" style="color: #777"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AddSrcBlockTool extends Vue {
  handleClick() {
    this.$emit('action', {
      content: '\n#+BEGIN_SRC\n\n#+END_SRC',
      position: 'CURRENT'
    });
  }
}
</script>

<style scoped></style>
