<template>
  <div>
    <div class="container-inner">
      <aside>
        <ul v-if="articles.length">
          <li v-on:click="onArticleItemClick(article)"
              v-bind:key="article.id"
              v-bind:class="{ active: foucsedArticleId === article.id }"
              v-for="article in articles">
            <div class="article-title">
              {{article.title}}
            </div>
            <div class="article-date">
              {{formatDate(article.updatedAt || article.createdAt)}}
            </div>
          </li>
        </ul>
      </aside>

      <div class="preview-contaier" v-bind:class="{ lock: isEncryption() }">
        <div class="preview-contaier-toolbar" v-if="!isEncryption()">
          <ul class="preview-operation">
            <li v-on:click="goEdit()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="edit" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="openHistoryCalendarModal()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="history" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="lockArticle()">
              <el-tooltip class="item" effect="dark" content="编辑" placement="right">
                <as-icon name="lock" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="downloadZip()">
              <el-tooltip class="item" effect="dark" content="下载" placement="right">
                <as-icon name="file-archive" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>

          </ul>
        </div>

        <ArticlePreview
          ref="preview"
          v-if="articles.find(a => a.id === foucsedArticleId) && !isEncryption()"
          :html="parseOrgCode(articles.find(a => a.id === foucsedArticleId).content)"
        />

        <div class="unlock-area" v-if="isEncryption()">
          <form v-on:submit="onUnlock($event)">
            <input name="木记" type="text" value="木记" style="display: none" />
            <input
              name="wood-article-password"
              type="password"
              placeholder="输入密码解锁"
              autocomplete="off"
              v-on:keyup.enter="onUnlock($event)"
              v-model="lockPassword" />
          </form>
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import * as org from 'orgpr';
import format from 'date-fns/format';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';
import * as values from 'ramda/src/values';
import * as sort from 'ramda/src/sort';
import * as compose from 'ramda/src/compose';
import ArticlePreview from '../components/ArticlePreview.vue';
import { LockServiceInstance } from '../service/lock';
import * as JSZipUtils from 'jszip-utils';

@Component({
  components: {
    ArticlePreview
  }
})
export default class Editor extends Vue {
  public foucsedArticleId: number | null = null;
  public lockPassword: string = '';
  public isLock = true;

  get articles() {
    return compose(
      sort((a: Article, b: Article) => (a.updatedAt || a.createdAt) < (b.updatedAt || b.createdAt)),
      values
    )(this.$store.state.articles);
  }

  goEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }

  public created() {
    this.getArticles();
    this.foucsedArticleId = <any>window.localStorage.getItem('foucsedArticleId');
  }

  onUnlock(event: Event) {

    event.preventDefault();
    this.isLock = LockServiceInstance.unlock(this.lockPassword);
  }

  isEncryption() {
    if (!this.foucsedArticleId) {
      return false;
    }
    return (
      this.$store.state.articles &&
      this.$store.state.articles[this.foucsedArticleId] &&
      this.$store.state.articles[this.foucsedArticleId].isEncryption &&
      this.isLock
    );
  }

  downloadZip() {
    const zip = new JSZip();
    zip.file(
      this.$store.state.articles[this.foucsedArticleId as number].title + '.org',
      this.$store.state.articles[this.foucsedArticleId as number].content
    );
    
    const content: string = this.$store.state.articles[this.foucsedArticleId as number].content;
    const imageUrls: string[] = [];
    content.replace(/image-url:([\S]+)]]/g, (substring: string, imageurl: string) => {
      imageUrls.push(imageurl);
      return '';
    });


    Promise.all(imageUrls.map((url, i) => {return this.addToZip(url, zip, i)})).then(() => {
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, `${this.$store.state.articles[this.foucsedArticleId as number].title}.zip`);
      });
    });
  }


  addToZip(imageUrl: string, zip: any, i: any) {
    return new Promise((resolve, reject) => {
      JSZipUtils.getBinaryContent(imageUrl, (err: any, data: any) => {
          if(err) {
            alert("Problem happened when download img: " + imageUrl);
            console.error("Problem happened when download img: " + imageUrl);
            resolve(zip); // ignore this error: just logging
            // deferred.reject(zip); // or we may fail the download
          } else {
            console.log(data);
            zip.file("picture"+i+".jpg", data, {binary:true});
            resolve(zip);
          }
      });
    })
  }

  openHistoryCalendarModal() {
    /* axios.get(`/api/auth/article/3/history`).then(resp => {
     *   console.log(resp);
     * }); */
  }

  lockArticle() {
    axios.post(`/api/auth/article/encryption/${this.foucsedArticleId}`).then(() => {});
  }

  public formatDate(date: number): string {
    return format(date, 'YYYY/MM/dd');
  }

  public getArticles() {
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/auth/articles?userId=${userId}`).then(resp => {
      this.$store.commit('articles', resp.data);

      if (!this.foucsedArticleId && this.articles[0]) {
        this.foucsedArticleId = this.articles[0].id;
      }
    });
  }

  public onArticleItemClick(article: Article) {
    this.foucsedArticleId = article.id;
    window.localStorage.setItem('foucsedArticleId', <any>article.id);
  }

  public parseOrgCode(code: string): string {
    const parser = new org.Parser();
    const orgDocument = parser.parse(code);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    return orgHTMLDocument.toString();
  }
}
</script>

<style scoped>
.container-inner {
  display: flex;
  height: 100%;
}

aside {
  width: 35%;
  max-width: 300px;
  border-right: 1px solid #f8f8f8;
  overflow-y: auto;
}

aside ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

aside li {
  padding-left: 20px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #f8f8f8;
  height: 50px;
  cursor: pointer;
  overflow: hidden;
}

aside li.active {
  background-color: #e8e8e8;
}

aside li:hover {
  background-color: #f8f8f8;
}

.article-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 3px;
  font-weight: bolder;
  color: #333;
}

.article-date {
  font-size: 12px;
  margin-top: 3px;
}

.preview-contaier {
  height: 100%;
  width: 100%;
  text-align: left;
  overflow-y: auto;
  position: relative;
}

.preview-contaier.lock {
  background-color: #ccc;
}

.preview-contaier:hover .preview-contaier-toolbar {
  opacity: 1;
}

.preview-contaier-toolbar {
  position: absolute;
  right: 10px;
  top: 0;
  /* opacity: 0; */
}

.preview-contaier-toolbar ul {
  list-style: none;
  margin: 5px;
}

.preview-operation li {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0 2px 10px #ccc;
  background-color: white;
  margin-bottom: 10px;
}

.preview-operation li svg {
  height: 20px;
  width: auto;
}

.unlock-area {
  background-color: #f8f8f8;
  position: absolute;
  height: 200px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.unlock-area input {
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  font-size: 16px;
  padding: 6px 12px;
  margin-top: -10px;
  text-align: center;
}
</style>
