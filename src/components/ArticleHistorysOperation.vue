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

    <li v-on:click="handleOpenHistoryCalendarModal()">
      <el-tooltip class="item" effect="dark" content="历史" placement="right">
        <as-icon name="history" size="25" style="color: #6ed2e6; padding-left: 3px;"></as-icon>
      </el-tooltip>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import format from 'date-fns/format';

@Component
export default class ArticleHistoryOperation extends Vue {
  @Prop() public foucsedArticleId!: string;
  public dialogVisible = false;
  public selectedDate = null;
  public focusHistory: any = null
  public historyDates = null;

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


  public handleCloseHisotyDateSelect() {
    this.dialogVisible = false;
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
