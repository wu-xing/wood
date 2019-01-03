<template>
  <aside class="container">
    <ul>
      <li 
        v-bind:key="box.id" 
        v-for="box of boxs"
        v-on:click="handleBoxClick(box)"
      >
        {{ box.name }}
      </li>
    </ul>

    <div class="button-container">
      <add-button :onClick="handleCreateButtonClick"></add-button>
    </div>

    <el-dialog
      title="Create new article category"
      width="400px"
      :visible.sync="dialogVisible"
      :before-close="handleClose">

      <el-form :model="createForm">
        <el-form-item>
          <el-input v-model="createForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-button native-type="submit" type="primary" @click="handleCreateBox($event)">create</el-button>
      </el-form>
    </el-dialog>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as values from 'ramda/src/values';
import * as compose from 'ramda/src/compose';

@Component({})
export default class Category extends Vue {
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

  get boxs() {
    const boxMap = this.$store.state.boxs;
    return compose(values)(boxMap);
  }

  handleBoxClick(box: any) {
    this.$store.commit('currentBoxId', box.id);
  }

  handleCreateBox(event: Event) {
    event.preventDefault();
    axios
      .post(`/api/auth/article-box`, {
        name: this.createForm.name
      })
      .then(() => {
        this.dialogVisible = false;
      });
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
  width: 35%;
  max-width: 180px;
  background-color: #333;
  color: white;
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
  border-bottom: 1px solid #777;
  height: 40px;
  line-height: 48px;
}

li:hover {
  background-color: #999;
}

a {
  color: #42b983;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}
</style>
