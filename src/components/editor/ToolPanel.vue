<template>
  <div class="tool-panel">
    <ul class="operation-list">
      <li v-if="!isEdit" v-on:click="$emit('save');">
        <el-tooltip class="item" effect="dark" content="保存" placement="right">
          <as-icon name="save" style="color: #777"></as-icon>
        </el-tooltip>
      </li>

      <AddTitleTool v-on:action="onToolAction" />

      <AddSrcBlockTool v-on:action="onToolAction" />

      <AddInlineCodeTool v-on:action="onToolAction" />

      <ToggleFullEditorTool :hiddenPreview="hiddenPreview" v-on:hiddenPreview="hiddenPreview = $event;" />

      <AddQuoteCodeTool v-on:action="onToolAction" />

      <li v-on:click="fullScreen();">
        <el-tooltip class="item" effect="dark" content="全屏" placement="right">
          <as-icon name="expand" style="color: #777"></as-icon>
        </el-tooltip>
      </li>

      <UploadImageTool v-on:action="onToolAction" />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AddInlineCodeTool from './editor-tools/AddInlineCodeTool.vue';
import ToggleFullEditorTool from './editor-tools/ToggleFullEditorTool.vue';
import AddQuoteCodeTool from './editor-tools/AddQuoteCodeTool.vue';
import AddSrcBlockTool from './editor-tools/AddSrcBlockTool.vue';
import AddTitleTool from './editor-tools/AddTitleTool.vue';
import UploadImageTool from './editor-tools/UploadImageTool.vue';

@Component({
  components: {
    AddInlineCodeTool,
    ToggleFullEditorTool,
    AddQuoteCodeTool,
    AddSrcBlockTool,
    AddTitleTool,
    UploadImageTool
  }
})
export default class ToolPanel extends Vue {
  @Prop()
  title!: string;

  @Prop()
  onToolAction!: any;

  @Prop()
  isEdit: boolean;

  @Prop()
  hiddenPreview: boolean;

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

.operation-list {
  display: block;
  list-style: none;
  padding: 0;
  text-align: center;
}

.operation-list li {
  position: relative;
  display: inline-block;
  width: 40px;
  text-align: center;
}
</style>
