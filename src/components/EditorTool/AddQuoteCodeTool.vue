<template>
  <li v-on:click="handleClick();">
    <el-tooltip class="item" effect="dark" content="引用" placement="right">
      <as-icon name="quote-right" style="color: #777"></as-icon>
    </el-tooltip>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AddQuoteCodeTool extends Vue {

  handleClick() {
    this.$emit('action', {
      content: '\n#+BEGIN_QUOTE\n\n#+END_QUOTE',
      position: 'CURRENT'
    });
  }
}
</script>

<style scoped></style>
