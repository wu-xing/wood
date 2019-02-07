<template>
  <div class="edit-title-container">
    <div>{{ wrappedTitle }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class EditingTitle extends Vue {
  innerTitle: string;

  @Prop()
  title!: string;

  get wrappedTitle() {
    return this.title === 'Untitled' ? '' : this.title;
  }

  created() {}

  mounted() {}

  destroyed() {}
}
</script>

<style scoped>
.edit-title-container {
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 50px;
  line-height: 55px;
  font-size: 25px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.edit-title-container div {
  display: inline-block;
  border-bottom: 2px solid #666;
  padding: 0 20px;
}
</style>
