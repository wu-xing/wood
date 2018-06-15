<template>
  <div class="container">
    <div class="operation-container">
      <ul class="operation-list">
        <li v-on:click="$emit('save')">
          <el-tooltip class="item" effect="dark" content="Save" placement="right">
            <i class="el-icon-document"></i>
          </el-tooltip>
        </li>
        <li v-on:click="addTitle()">
           <el-tooltip class="item" effect="dark" content="Title" placement="right">
             <i class="el-icon-edit"></i>
           </el-tooltip>
        </li>

      </ul>
    </div>
    <div class="edit-container">
      <div class="org-code-container">
        <textarea v-on:input="onContentChanged" v-bind:value="value.content" cols="30" id="" name="" rows="10"></textarea>
      </div>

      <div class="org-preview-container" v-html="orgHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as org from 'orgpr';

@Component({})
export default class OrgModeEditor extends Vue {
  public orgHtml: string = '';

  @Prop() value: any;

  onContentChanged($event: any) {
    const parser = new org.Parser();
    const orgDocument = parser.parse($event.target.value);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    this.orgHtml = orgHTMLDocument.toString();
    this.$emit('input', {
      title: orgHTMLDocument.title,
      content: $event.target.value
    });
  }

  addTitle() {
    this.$emit('input', { ...this.value, content: this.value.content + `#+TITLE: \n#+AUTHOR:\n` });
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: calc(100vh - 61px);
  display: flex;
}

.edit-container {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  width: calc(100vw - 50px);
  height: 100%;
}

.operation-container {
  width: 50px;
  height: 100%;
  border-right: 1px solid #e8e8e8;
}

.org-code-container {
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #e8e8e8;
}

.operation-list {
  padding: 0;
  margin: 0;
}

.operation-list li {
  outline: none;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}

.org-code-container textarea {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}

.org-preview-container {
  text-align: left;
  width: 50%;
  height: 100%;
}
</style>
