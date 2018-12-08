<template>
  <div>
    <div>
      <as-icon name="poll-h"></as-icon>
    </div>
    <div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PreviewWorkFloatPanel extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
