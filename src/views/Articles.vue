<template>
  <div>
    <el-dialog
      title="选择历史日期"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <datepicker
        v-if="historyDates"
        v-on:selected="onHistoryDateSelect"
        :inline="true"
        :disabledDates="genDisabledDates(historyDates)"></datepicker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmSelectHistory">确 定</el-button>
      </span>
    </el-dialog>

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
              <el-tooltip class="item" effect="dark" content="历史" placement="right">
                <as-icon name="history" size="25" style="color: #6ed2e6; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="lockArticle()">
              <el-tooltip class="item" effect="dark" content="加锁" placement="right">
                <as-icon name="lock" size="25" style="color: #f86920; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="downloadZip()">
              <el-tooltip class="item" effect="dark" content="下载" placement="right">
                <as-icon name="file-archive" size="25" style="color: #32ace1; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>
            <li v-on:click="share()">
              <el-tooltip class="item" effect="dark" content="分享" placement="right">
                <as-icon name="share" size="25" style="color: #8b4647; padding-left: 3px;"></as-icon>
              </el-tooltip>
            </li>

          </ul>
        </div>

        <ArticlePreview
          ref="preview"
          v-if="articles.find(a => a.id === foucsedArticleId) && !isEncryption()"
          :html="getPreviewHtml()"
          :articleHistory="focusHistory"
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
import { extractImageUrls, replaceArticleImageUrl, extractUrlHash } from '../util/article';
import { getBinaryContent } from '../util/zip';
import Datepicker from 'vuejs-datepicker';

@Component({
  components: {
    ArticlePreview,
    Datepicker
  }
})
export default class Articles extends Vue {
  public foucsedArticleId: number | null = null;
  public lockPassword: string = '';
  public isLock = true;
  public dialogVisible = false;
  public historyDates = null;
  public selectedDate = null;
  /* public isHistoryPreview = false; */
  public focusHistory: any = null

  get articles() {
    return compose(
      sort((a: Article, b: Article) => (a.updatedAt || a.createdAt) < (b.updatedAt || b.createdAt)),
      values
    )(this.$store.state.articles);
  }

  getPreviewHtml() {
    const article = this.articles.find((a: Article) => a.id === this.foucsedArticleId);
    if (!article) {
      return;
    }
    if (this.focusHistory) {
      return this.parseOrgCode(this.focusHistory.content);
    }
    return this.parseOrgCode(article.content)
  }

  genDisabledDates(historyDates: string[]) {
    return {
      customPredictor: (date: Date) => {
        if (!historyDates) {
          return true;
        }
        return historyDates.indexOf(format(date, 'yyyy-MM-dd')) < 0;
      }
    };
  }

  goEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }

  created() {
    this.getArticles();
    this.foucsedArticleId = <any>window.localStorage.getItem('foucsedArticleId');
    window.document.title = `文章 | 木记`;

  }

  onHistoryDateSelect(day: any) {
    this.selectedDate = day;
  }

  onConfirmSelectHistory() {
    const date = format(<any>this.selectedDate, 'yyyy-MM-dd');
    axios.get(`/api/auth/article/${this.foucsedArticleId}/history/${date}`).then(resp => {
      /* this.isHistoryPreview = true */
      this.focusHistory = resp.data;
      this.dialogVisible = false;
    });
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

  share() {
    const host = window.location.hostname;
    const protocol = location.protocol;
    const port = location.port;
    const url = `${protocol}//${host}${port === '80' ? '' : ':' + port}/p/${this.foucsedArticleId}`;

    
    this.$alert(`<a href=${url} target="_blank">${url}</a>`, '已生成分享链接(此文章已被公开)', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true
    });
  }

  public downloadZip() {
    const zip = new JSZip();
    const articleTitle = this.$store.state.articles[this.foucsedArticleId as number].title;
    const articleContent = this.$store.state.articles[this.foucsedArticleId as number].content;

    const content: string = this.$store.state.articles[this.foucsedArticleId as number].content;
    const imageUrls: string[] = extractImageUrls(articleContent);

    zip.file(articleTitle + '.org', replaceArticleImageUrl(articleTitle, articleContent));

    Promise.all(imageUrls.map(getBinaryContent)).then(results => {
      if (imageUrls.length) {
        const assetsFolder = zip.folder(articleTitle);
        (<Array<{ binary: any; url: string }>>results).map(
          (result: { binary: any; url: string }) => {
            assetsFolder.file(extractUrlHash(result.url), result.binary, { binary: true });
          }
        );
      }
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, `${articleTitle}.zip`);
      });
    });
  }

  handleClose() {
    this.dialogVisible = false;
  }

  openHistoryCalendarModal() {
    this.dialogVisible = true;
    this.selectedDate = null;
    axios.get(`/api/auth/article/${this.foucsedArticleId}/history`).then(resp => {
      this.historyDates = resp.data;
    });
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
    this.focusHistory = null;
    this.historyDates = null;
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
  color: #612e00;
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


<style>
.vdp-datepicker__calendar {
  margin: 0 auto;
  border: 0;
  transform: scale(1.1, 1.1);
}
</style>
