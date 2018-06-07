<template>
  <div class="container">
    <div class="org-code-container">
      <textarea  v-model="form.content" cols="30" id="" name="" rows="10"></textarea>
    </div>

    <div>

    </div>
    <div class="org-preview-container" v-html="orgHtml"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as org from 'orgpr';

@Component({})
export default class OrgModeEditor extends Vue {
  public form: {
    content: string;
  } = { content: '' };
  public orgHtml: string = '';

  constructor() {
    super();
  }

  @Watch('form.content')
  onContentChanged(value: string) {
    const parser = new org.Parser();
    const orgDocument = parser.parse(value);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    this.orgHtml = orgHTMLDocument.toString();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  height: calc(100vh - 61px);
}

.org-code-container {
  width: 50%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #e8e8e8;
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
