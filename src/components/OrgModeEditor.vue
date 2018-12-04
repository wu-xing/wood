<template>
  <div class="container">
    <div class="operation-container">
      <ul class="operation-list">
        <li v-if="!isEdit" v-on:click="$emit('save');">
          <el-tooltip class="item" effect="dark" content="保存" placement="right">
            <as-icon name="save" style="color: #777"></as-icon>
          </el-tooltip>
        </li>
        
        <AddTitleTool v-on:action="onToolAction" />
        
        <AddSrcBlockTool v-on:action="onToolAction" />

        <AddInlineCodeTool v-on:action="onToolAction" />

        <ToggleFullEditorTool :hiddenPreview="hiddenPreview" v-on:hiddenPreview="hiddenPreview = $event" />
       
        <AddQuoteCodeTool v-on:action="onToolAction" />

        <li v-on:click="fullScreen();">
          <el-tooltip class="item" effect="dark" content="全屏" placement="right">
            <as-icon name="expand" style="color: #777"></as-icon>
          </el-tooltip>
        </li>

        <UploadImageTool v-on:action="onToolAction" />
        
      </ul>
    </div>

    <div class="edit-container" ref="editContainer">
      <div class="org-code-container" v-bind:style="{ width: editAreaWidth }">
        <textarea
          ref="textarea"
          v-on:input="onContentChanged"
          v-on:scroll="onTextAreaScroll"
          v-bind:value="document.content"
        ></textarea>
      </div>

      <div class="border" ref="border"></div>

      <div class="org-preview-container" v-if="!hiddenPreview"><ArticlePreview ref="preview" :html="orgHtml" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as org from 'orgpr';
import ArticlePreview from './ArticlePreview.vue';
import { fromEvent, merge } from 'rxjs';
import { concatMap, takeUntil, tap } from 'rxjs/operators';
import AddInlineCodeTool from './EditorTool/AddInlineCodeTool.vue';
import ToggleFullEditorTool from './EditorTool/ToggleFullEditorTool.vue';
import AddQuoteCodeTool from './EditorTool/AddQuoteCodeTool.vue';
import AddSrcBlockTool from './EditorTool/AddSrcBlockTool.vue';
import AddTitleTool from './EditorTool/AddTitleTool.vue';
import UploadImageTool from './EditorTool/UploadImageTool.vue';

@Component({
  components: {
    ArticlePreview,
    AddInlineCodeTool,
    ToggleFullEditorTool,
    AddQuoteCodeTool,
    AddSrcBlockTool,
    AddTitleTool,
    UploadImageTool
  }
})
export default class OrgModeEditor extends Vue {
  public orgHtml: string = '';
  title: string = '';
  editAreaWidth: any = '50%';

  @Prop()
  articleId!: string;

  @Prop({ default: () => false })
  isEdit!: boolean;

  @Prop({ default: () => ({ content: '', title: '' }) })
  document!: any;

  @Prop({ default: () => false })
  public waitPush?: boolean;

  public hiddenPreview = false;

  created() {
    this.parseHtmlFromOrgCode(this.document.content);
    window.addEventListener('beforeunload', this.handleBeforeunload);
    this.hiddenPreview = window.localStorage.getItem(`article-${this.articleId}-preview`) !== 'true';
  }

  mounted() {
    this.setupBorderReactive();
  }

  destroyed() {
    window.removeEventListener('beforeunload', this.handleBeforeunload);
  }

  onToolAction({content, position}: {content: string, position: 'CURRENT' | 'BEGIN' | 'END'}) {
    if (position === 'CURRENT') {
      this.$emit('change', {
        ...this.document,
        content: this.getInsertValueToTextArea(content)
      });
    }
    if (position === 'BEGIN') {
      this.$emit('change', {
        ...this.document,
        content: content + this.document.content
      });
    }
    if (position === 'END') {
      this.$emit('change', {
        ...this.document,
        content: this.document.content + content
      });
    }
  }

  getEditAreaOffsetX(): number {
    return (<HTMLElement>this.$refs.editContainer).offsetLeft;
  }

  setupBorderReactive() {
    const editOffsetX = this.getEditAreaOffsetX();

    const el: HTMLElement = <HTMLElement>this.$refs.border;
    const start$ = fromEvent(el, 'mousedown');
    const move$ = fromEvent(window.document, 'mousemove');
    const end$ = merge(
      fromEvent(window.document, 'mouseup'),
      fromEvent(window, 'blur'),
      fromEvent(window, 'contextmenu')
    );

    start$
      .pipe(
        tap(event => event.preventDefault()),
        concatMap(() => move$.pipe(takeUntil(end$)))
      )
      .subscribe((event: any) => {
        console.log(event);
        console.log(event.offsetX, editOffsetX);
        // TODO remove flex
        const borderOffsetLeft = event.clientX - editOffsetX;
        console.log(borderOffsetLeft);
        this.editAreaWidth = borderOffsetLeft + 'px';
      });
  }

  @Watch('document')
  onValueChange(document: any) {
    this.parseHtmlFromOrgCode(document.content);
  }

  handleBeforeunload = (event: any) => {
    const confirmationMessage = 'o/';
    if (this.waitPush) {
      (event || window.event).returnValue = confirmationMessage;
    }
  };

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
      (<HTMLElement>this.$refs.textarea).scrollTop / (<HTMLElement>this.$refs.textarea).scrollHeight;
    const preview: Vue = <any>this.$refs.preview;
    window.requestAnimationFrame(() => {
      preview.$el.scrollTop = preview.$el.scrollHeight * textareaScrollRatio;
    });
  }

  fullScreen() {
    this.$eventHub.$emit('full-screen');
  }

  getInsertValueToTextArea(myValue: string): string {
    const myField: any = this.$el.querySelector('textarea');
    if (myField.selectionStart || myField.selectionStart === 0) {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      return myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
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
  justify-content: flex-start;
  align-content: flex-start;
  height: 100%;
  width: 100%;
}

.operation-container {
  width: 40px;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  background-color: #f8f8f8;
  flex-shrink: 0;
}

.border {
  height: 100;
  width: 10px;
  background-color: #999;
  cursor: ew-resize;
  user-select: none;
}

.org-code-container {
  height: 100%;
}

.operation-list {
  padding: 0;
  margin: 0;
  text-align: center;
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
  width: 50%;
  height: 100%;
  position: relative;
}
</style>
