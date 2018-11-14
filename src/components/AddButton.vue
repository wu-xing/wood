<template>
  <button @click="onClick">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AddButton extends Vue {
  @Prop()
  public onClick!: Function;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
