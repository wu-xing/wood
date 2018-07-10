<template>
  <div class="container">
    <div class="operation-container">
      <ul class="operation-list">
        <li v-if="!isEdit" v-on:click="$emit('save')">
          <el-tooltip class="item" effect="dark" content="Save" placement="right">
            <as-icon name="save"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addTitle()">
          <el-tooltip class="item" effect="dark" content="Title" placement="right">
             <as-icon name="heading"></as-icon>
           </el-tooltip>
        </li>
        <li v-on:click="addSrcBlog()">
          <el-tooltip class="item" effect="dark" content="代码" placement="right">
            <as-icon name="code"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addInlineCode()">
          <el-tooltip class="item" effect="dark" content="行内代码" placement="right">
            <as-icon name="terminal"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="fullScreen()">
          <el-tooltip class="item" effect="dark" content="全屏" placement="right">
            <as-icon name="expand"></as-icon>
          </el-tooltip>
        </li>
        <li>
          <el-upload
            class="upload-demo"
            accept="image/*"
            action="/api/auth/image"
            :multiple="true"
            :http-request="uploadImage"
            :on-change="handleImageUploadChange">
            <el-tooltip class="item" effect="dark" content="上传图片" placement="right">
              <as-icon name="image"></as-icon>
            </el-tooltip>
          </el-upload>

        </li>
      </ul>
    </div>
    <div class="edit-container">
      <div class="org-code-container">
        <textarea v-on:input="onContentChanged" v-bind:value="document.content" cols="30" id="" name="" rows="10"></textarea>
      </div>

      <div class="org-preview-container">
        <ArticlePreview :html="orgHtml"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as org from 'orgpr';
import axios from 'axios';
import ArticlePreview from './ArticlePreview.vue';

@Component({
  components: {
    ArticlePreview
  }
})
export default class OrgModeEditor extends Vue {
  public orgHtml: string = '';
  title: string = '';

  @Prop({ default: () => false })
  isEdit!: boolean;

  @Prop({ default: () => ({ content: '', title: '' }) })
  document!: any;

  created() {
    this.parseHtmlFromOrgCode(this.document.content);
  }

  @Watch('document')
  onValueChange(document: any) {
    /* this.parseHtmlFromOrgCode(document.content); */
    this.parseHtmlFromOrgCode(document.content);
  }

  parseHtmlFromOrgCode(code: any) {
    try {
      const parser = new org.Parser();
      const orgDocument = parser.parse(code);
      const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false
      });
      this.orgHtml = orgHTMLDocument.toString();
      this.title = orgHTMLDocument.title;
    } catch (error) {
      console.warn('解析失败.');
    }
  }

  onContentChanged($event: any) {
    const document = {
      title: this.title,
      content: $event.target.value
    };
    this.$emit('input', document);
    this.$emit('change', document);
  }

  addTitle() {
    this.$emit('change', {
      ...this.document,
      content: `#+TITLE: \n#+AUTHOR:\n` + this.document.content
    });
  }

  addSrcBlog() {
    this.$emit('change', {
      ...this.document,
      content: this.document.content + `\n#+BEGIN_SRC\n\n#+END_SRC`
    });
  }

  addInlineCode() {
    this.$emit('change', {
      ...this.document,
      content: this.document.content + `= [code] =`
    });
  }

  fullScreen() {
    this.$eventHub.$emit('full-screen');
  }

  handleImageUploadChange() {}

  uploadImage(uploadObject: any) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e: any) => {
      axios
        .post('/api/auth/image/base64', {
          image: e.target.result
        })
        .then((resp: any) => {
          this.$emit('change', {
            ...this.document,
            content: this.getInsertValueToTextArea(`\n[[image-url:/${resp.data.image}]]`)
          });
        });
    });

    fileReader.readAsDataURL(uploadObject.file);
  }

  getInsertValueToTextArea(myValue: string): string {
    const myField: any = this.$el.querySelector('textarea');
    if (myField.selectionStart || myField.selectionStart === '0') {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      return (
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length)
      );
    } else {
      return myField.value + myValue;
    }
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
  padding: 0 10px;
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
  margin: 0;
  text-align: left;
  width: 50%;
  height: 100%;
  padding: 0 10px;
}
</style>
