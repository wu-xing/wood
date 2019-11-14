<template>
  <div>
    <el-button  icon="el-icon-plus" type="primary" size="small" v-on:click="innerOnClick" round>新建笔记</el-button>

    <el-dialog
      title="选择笔记类型"
      width="400px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <SelectList v-bind:options="options" v-on:select="onSelected()"></SelectList>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SelectListOption } from '../typing/widget';
import SelectList from './SelectList.vue';
import axios from 'axios';

@Component({
  components: {
    SelectList
  }
})
export default class CreateArticleButton extends Vue {
  public options: SelectListOption[] = [
    {
      label: 'Markdown',
      value: 'Markdown'
    },
    {
      label: 'Org-mode',
      value: 'Org-mode'
    },
    {
      label: '富文本',
      value: 'Rich'
    }
  ];

  public dialogVisible = false;

  handleClose() {
    this.dialogVisible = false;
  }

  innerOnClick() {
    this.dialogVisible = true;
  }

  onSelected(option: SelectListOption) {
    const document = {
      content: '',
      title: '',
      createdAt: new Date().getTime(),
      type: option.value
    };
    axios
      .post('/api/note', document)
      .then(resp => {
        this.$store.commit('article', {
          id: resp.data.id,
          ...document
        });
        this.saved = false;
        window.localStorage.removeItem(DRAFT_KEY);
        router.push({
          name: 'article-edit',
          params: {
            id: resp.data.id
          }
        });
      })
      .catch(error => {
        Message({
          message: 'Add article failure.',
          type: 'error'
        });
        this.saved = false;
      });
  }
}
</script>

<style scoped>
button {
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
