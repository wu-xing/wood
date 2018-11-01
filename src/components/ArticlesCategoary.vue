<template>
  <div class="container">
    <ul>
      <li>默认</li>
      <li>搜索：“{{searchStr}}”</li>
    </ul>

    <button v-on:click="handleCreateButtonClick()">+</button>

    <el-dialog
      title="选择历史日期"
      width="400px"
      :visible.sync="dialogVisible"
      :before-close="handleClose">

      <el-form :model="createForm">
        <el-form-item label="活动名称">
          <el-input v-model="createForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <button v-on:click="handleCreateBox">create</button>
      </el-form>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class ArticleCategory extends Vue {
  public searchStr: string = '';
  public dialogVisible = false;
  public createForm = {
    name: ''
  };

  created() {
    this.$eventHub.$on('searchStr', (searchStr: string) => {
      this.searchStr = searchStr;
    });

    this.$store.dispatch('getArticleBoxs');
  }

  handleCreateBox(event: Event) {
    event.preventDefault();
    axios
      .post(`/api/auth/article-box`, {
        name: this.createForm.name
      })
      .then();
  }

  handleClose() {
    this.dialogVisible = false;
  }

  handleCreateButtonClick() {
    this.dialogVisible = true;
  }
}
</script>

<style scoped>
.container {
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding-left: 20px;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #f8f8f8;
  height: 50px;
  line-height: 48px;
}

li:hover {
  background-color: #f8f8f8;
}

a {
  color: #42b983;
}
</style>
