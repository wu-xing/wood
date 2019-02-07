<template>
  <div class="tool-panel">
    <ul class="operation-list">
      <li v-if="!isEdit" v-on:click="$emit('save');">
        <el-tooltip class="item" effect="dark" content="保存" placement="bottom" v-bind:open-delay="1000">
          <as-icon name="save" style="color: #777"></as-icon>
        </el-tooltip>
      </li>

      <AddTitleTool v-on:action="onToolAction" />

      <AddSrcBlockTool v-on:action="onToolAction" />

      <AddInlineCodeTool v-on:action="onToolAction" />

      <ToggleFullEditorTool />

      <AddQuoteCodeTool v-on:action="onToolAction" />

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

  created() {}

  mounted() {}

  destroyed() {}
}
</script>

<style>
.tool-panel {
  text-align: center;
  flex: 0 0 auto;
}

.operation-list {
  list-style: none;
  padding: 0;
  text-align: center;
  display: inline-block;
  border: 1px solid #99999930;
  padding: 10px 10px 7px;
  border-radius: 6px;
  box-shadow: 0 0 6px #99999930;
  margin: 0;
  transition: all 200ms ease-in-out;
}

.operation-list:hover {
  transform: scale(1.02, 1.02);
}

.operation-list li {
  position: relative;
  display: inline-block;
  width: 40px;
  text-align: center;
  cursor: pointer;
}

.operation-list svg {
  transition: all 200ms ease-in-out;
}

.operation-list svg:hover {
  color: #47b784 !important;
}
</style>
