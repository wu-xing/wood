<template>
  <div class="container">
    <div class="operation-container">
      <ul class="operation-list">
        <li v-if="!isEdit" v-on:click="$emit('save')">
          <el-tooltip class="item" effect="dark" content="保存" placement="right">
            <as-icon name="save" style="color: #32aba3"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addTitle()">
          <el-tooltip class="item" effect="dark" content="标题" placement="right">
            <as-icon name="heading" style="color: #dc4e52"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addSrcBlock()">
          <el-tooltip class="item" effect="dark" content="代码" placement="right">
            <as-icon name="code" style="color: #df9c38"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addInlineCode()">
          <el-tooltip class="item" effect="dark" content="行内代码" placement="right">
            <as-icon name="terminal" style="color: #972a93"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="toggleFullEditor()">
          <el-tooltip class="item" effect="dark" v-bind:content="!hiddenPreview? '隐藏预览' : '显示预览'" placement="right">
            <as-icon name="columns" style="color: #169f43"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="addQuoteCode()">
          <el-tooltip class="item" effect="dark" content="引用" placement="right">
            <as-icon name="quote-right" style="color: #169f43"></as-icon>
          </el-tooltip>
        </li>
        <li v-on:click="fullScreen()">
          <el-tooltip class="item" effect="dark" content="全屏" placement="right">
            <as-icon name="expand" style="color: #8b6956"></as-icon>
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
              <as-icon name="image" style="color: #f9674e"></as-icon>
            </el-tooltip>
          </el-upload>

        </li>
      </ul>
    </div>
    <div class="edit-container">
      <div class="org-code-container">
        <textarea
          ref="textarea"
          v-on:input="onContentChanged"
          v-on:scroll="onTextAreaScroll"
          v-bind:value="document.content"
        ></textarea>
      </div>

      <div
        class="org-preview-container"
        v-if="!hiddenPreview">
        <ArticlePreview
          ref="preview"
          :html="orgHtml"
        />
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

  @Prop()
  articleId!: string;
  
  @Prop({ default: () => false })
  isEdit!: boolean;

  @Prop({ default: () => ({ content: '', title: '' }) })
  document!: any;

  @Prop({ default: () => false})
  public waitPush?: boolean;

  public hiddenPreview = false;

  created() {
    this.parseHtmlFromOrgCode(this.document.content);
    window.addEventListener('beforeunload', this.handleBeforeunload);
    this.hiddenPreview = window.localStorage.getItem(`article-${this.articleId}-preview`) !== 'true';
  }

  destroyed() {
    window.removeEventListener('beforeunload', this.handleBeforeunload);
  }

  @Watch('document')
  onValueChange(document: any) {
    this.parseHtmlFromOrgCode(document.content);
  }

  handleBeforeunload = (event: any) => {
    const confirmationMessage = '\o/';
    if (this.waitPush) {
      (event || window.event).returnValue = confirmationMessage;
    }
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

  toggleFullEditor() {
    this.hiddenPreview = !this.hiddenPreview;
    window.localStorage.setItem(`article-${this.articleId}-preview`, (!this.hiddenPreview).toString());
  }

  onTextAreaScroll(event: Event) {
    const textareaScrollRatio =
      (<HTMLElement>this.$refs.textarea).scrollTop /
    (<HTMLElement>this.$refs.textarea).scrollHeight;
    const preview: Vue = <any>this.$refs.preview;
    window.requestAnimationFrame(() => {
      preview.$el.scrollTop = preview.$el.scrollHeight * textareaScrollRatio;
    });
  }

  addTitle() {
    this.$emit('change', {
      ...this.document,
      content: `#+TITLE: \n#+AUTHOR:\n` + this.document.content
    });
  }

  addSrcBlock() {
    this.$emit('change', {
      ...this.document,
      content: this.getInsertValueToTextArea(`\n#+BEGIN_SRC\n\n#+END_SRC`)
    });
  }

  addQuoteCode() {
    this.$emit('change', {
      ...this.document,
      content: this.getInsertValueToTextArea(`#+BEGIN_QUOTE\n\n#+END_QUOTE`)
    });
  }

  addInlineCode() {
    this.$emit('change', {
      ...this.document,
      content: this.getInsertValueToTextArea(`= [code] =`)
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
    if (myField.selectionStart || myField.selectionStart === 0) {
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
  height: 100%;
  display: flex;
}

.edit-container {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  width: calc(100vw - 50px);
  height: 100%;
  width: 100%;
}

.operation-container {
  width: 40px;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  background-color: #fffcf8;
}

.org-code-container {
  width: 100%;
  height: 100%;
  border-right: 1px solid #e8e8e8;
}

.operation-list {
  padding: 0;
  margin: 0;
}

.operation-list li {
  outline: none;
  height: 38px;
  line-height: 50px;
  cursor: pointer;
}

.org-code-container textarea {
  width: 100%;
  height: 100%;
  outline: none;
  padding-bottom: 130px;
  letter-spacing: 1px;
  border: none;
  font-size: 15px;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.org-preview-container {
  margin: 0;
  text-align: left;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
