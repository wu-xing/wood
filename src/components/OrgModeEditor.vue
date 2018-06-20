<template>
  <div class="container">
    <div class="operation-container">
      <ul class="operation-list">
        <li v-if="!isEdit" v-on:click="$emit('save')">
          <el-tooltip class="item" effect="dark" content="Save" placement="right">
            <i class="el-icon-document"></i>
          </el-tooltip>
        </li>
        <li v-on:click="addTitle()">
           <el-tooltip class="item" effect="dark" content="Title" placement="right">
             <i class="el-icon-edit"></i>
           </el-tooltip>
        </li>
        <li v-on:click="addTitle()">
          <el-tooltip class="item" effect="dark" content="全屏" placement="right">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="edit-container">
      <div class="org-code-container">
        <textarea v-on:input="onContentChanged" v-bind:value="document.content" cols="30" id="" name="" rows="10"></textarea>
      </div>

      <div class="org-preview-container" v-html="orgHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as org from 'orgpr';

@Component({})
export default class OrgModeEditor extends Vue {
  public orgHtml: string = '';

  @Prop({ default: () => ({ content: '', title: '' }) })
  document: any;

  @Prop({ default: false })
  isEdit: boolean;

  created() {
    this.parseHtmlFromOrgCode(this.document.content);
  }

  @Watch('document')
  onValueChange(document: any) {
    /* this.parseHtmlFromOrgCode(document.content); */
  }

  parseHtmlFromOrgCode(code: any) {
    const parser = new org.Parser();
    const orgDocument = parser.parse(code);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    /* this.document = orgHTMLDocument; */
    this.orgHtml = orgHTMLDocument.toString();
  }

  onContentChanged($event: any) {
    this.parseHtmlFromOrgCode($event.target.value);
    const document = {
      title: this.document.title,
      content: $event.target.value
    };
    this.$emit('input', document);
    this.$emit('change', document);
  }

  addTitle() {
    this.$emit('input', {
      ...this.document,
      content: `#+TITLE: \n#+AUTHOR:\n` + this.document.content
    });
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
  padding: 10px;
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
  padding: 10px;
}
</style>
