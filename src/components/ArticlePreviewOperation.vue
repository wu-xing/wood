<template>
  <div>
    <el-dialog
      title="选择历史日期"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleCloseHisotyDateSelect">

      <datepicker
        v-if="historyDates"
        v-on:selected="handleHistoryDateSelect"
        :inline="true"
        :disabledDates="genDisabledDates(historyDates)"></datepicker>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmSelectHistory">确 定</el-button>
      </span>
    </el-dialog>

    <div class="preview-contaier" v-bind:class="{ lock: isEncryption() }">
      <div class="preview-contaier-toolbar" v-if="!isEncryption()">
        <ul class="preview-operation">
          <li v-on:click="handleGoEdit()">
            <el-tooltip class="item" effect="dark" content="编辑" placement="right">
              <as-icon name="edit" size="25" style="color: #dc4e52; padding-left: 3px;"></as-icon>
            </el-tooltip>
          </li>
          <li v-on:click="handleOpenHistoryCalendarModal()">
            <el-tooltip class="item" effect="dark" content="历史" placement="right">
              <as-icon name="history" size="25" style="color: #6ed2e6; padding-left: 3px;"></as-icon>
            </el-tooltip>
          </li>
          <li v-on:click="handleLockArticle()">
            <el-tooltip class="item" effect="dark" content="加锁" placement="right">
              <as-icon name="lock" size="25" style="color: #f86920; padding-left: 3px;"></as-icon>
            </el-tooltip>
          </li>
          <li v-on:click="handleDownloadZip()">
            <el-tooltip class="item" effect="dark" content="下载" placement="right">
              <as-icon name="file-archive" size="25" style="color: #32ace1; padding-left: 3px;"></as-icon>
            </el-tooltip>
          </li>
          <li v-on:click="handleShare()">
            <el-tooltip class="item" effect="dark" content="分享" placement="right">
              <as-icon name="share" size="25" style="color: #8b4647; padding-left: 3px;"></as-icon>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as JSZip from 'jszip';
import axios from 'axios';
import format from 'date-fns/format';
import Datepicker from 'vuejs-datepicker';
import { extractImageUrls, replaceArticleImageUrl, extractUrlHash } from '../util/article';
import { getBinaryContent } from '../util/zip';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  components: {
    Datepicker
  }
})
export default class ArticlePreviewOperation extends Vue {
  @Prop() public foucsedArticleId: string;
  public dialogVisible = false;
  public historyDates = null;
  public selectedDate = null;

  public handleOpenHistoryCalendarModal() {
    this.dialogVisible = true;
    this.selectedDate = null;
    axios.get(`/api/auth/article/${this.foucsedArticleId}/history`).then(resp => {
      this.historyDates = resp.data;
    });
  }

  public handleHistoryDateSelect(day: any) {
    this.selectedDate = day;
  }

  // TODO rename isFocusArticeEncryption
  public isEncryption() {
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

  public genDisabledDates(historyDates: string[]) {
    return {
      customPredictor: (date: Date) => {
        if (!historyDates) {
          return true;
        }
        return historyDates.indexOf(format(date, 'yyyy-MM-dd')) < 0;
      }
    };
  }

  public handleConfirmSelectHistory() {
    const date = format(<any>this.selectedDate, 'yyyy-MM-dd');
    axios.get(`/api/auth/article/${this.foucsedArticleId}/history/${date}`).then(resp => {
      /* this.isHistoryPreview = true */
      this.focusHistory = resp.data;
      this.dialogVisible = false;
    });
  }

  public handleCloseHisotyDateSelect() {
    this.dialogVisible = false;
  }

  public handleGoEdit() {
    this.$router.push(`/article/${this.foucsedArticleId}`);
  }

  public handleLockArticle() {
    axios.post(`/api/auth/article/encryption/${this.foucsedArticleId}`).then(() => {});
  }

  public handleDownloadZip() {
    const zip = new JSZip();
    const articleTitle = this.$store.state.articles[this.foucsedArticleId as number].title;
    const articleContent = this.$store.state.articles[this.foucsedArticleId as number].content;

    const content: string = this.$store.state.articles[this.foucsedArticleId as number].content;
    const imageUrls: string[] = extractImageUrls(articleContent);

    zip.file(articleTitle + '.org', replaceArticleImageUrl(articleTitle, articleContent));

    Promise.all(imageUrls.map(getBinaryContent)).then(results => {
      if (imageUrls.length) {
        const assetsFolder = zip.folder(articleTitle);
        (<Array<{ binary: any; url: string }>>results).map((result: { binary: any; url: string }) => {
          assetsFolder.file(extractUrlHash(result.url), result.binary, { binary: true });
        });
      }
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, `${articleTitle}.zip`);
      });
    });
  }

  public handleShare() {
    const host = window.location.hostname;
    const protocol = location.protocol;
    const port = location.port;
    const url = `${protocol}//${host}${port === '80' || !port ? '' : ':' + port}/p/${this.foucsedArticleId}`;

    // TODO 报错
    // TODO 成功才提示
    axios.post(`/api/auth/article/share/${this.foucsedArticleId}`).then(() => {});
    this.$alert(`<a href=${url} target="_blank">${url}</a>`, '已生成分享链接(此文章已被公开)', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true
    });
  }
}
</script>

<style scoped>
.preview-contaier {
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
</style>
