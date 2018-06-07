<template>
  <div class="container">
    <div>
      <textarea  v-model="form.content" cols="30" id="" name="" rows="10"></textarea>
    </div>

    <div>
      
    </div>
    <div v-html="orgHtml"></div>
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

</style>
