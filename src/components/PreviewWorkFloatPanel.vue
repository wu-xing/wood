<template>
  <div class="preview-work-float-panel">
    <div class="icon-container">
      <as-icon name="poll-h" size="18"></as-icon>
    </div>
    <div class="panel-container">
      <ul>
        <li>History</li>
      </ul>
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
.preview-work-float-panel {
  position: absolute;
  right: 0;
  top: 0;
}

.preview-work-float-panel:hover .panel-container {
  display: block;
}

.panel-container {
  display: none;
}

.panel-container ul {
  margin: 0;
  padding: 0;
}
</style>
