<template>
  <ul>
      <li v-for=""></li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectList extends Vue {
 @Prop() options: any[];

 
}
</script>

<style scoped>

</style>
