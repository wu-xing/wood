<template>
  <div class="container">
    <div>{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class EditingTitle extends Vue {
  @Prop()
  title!: string;

  created() {}

  mounted() {}

  destroyed() {}
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
