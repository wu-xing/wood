<template>
  <div class="hello">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ArticleOperation extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
</style>
