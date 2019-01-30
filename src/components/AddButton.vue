<template>
  <button v-on:click="onClick"><as-icon name="plus" color="#454f56"></as-icon></button>
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
button {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  box-shadow: 1px 1px 5px #bbb;
  outline: none;
  cursor: pointer;
}
</style>
