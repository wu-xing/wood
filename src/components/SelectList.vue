<template>
  <ul>
    <li
      v-for="option of options"
      v-bind:key="option.value"
      v-on:click="onClick(option)"
    >{{option.label}}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SelectListOption } from '../typing/widget';

@Component
export default class SelectList extends Vue {
  @Prop() options: SelectListOption[];

  onClick(option: SelectListOption) {
    this.$emit('select', option);
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}




li {
  height: 50px;
}
</style>
