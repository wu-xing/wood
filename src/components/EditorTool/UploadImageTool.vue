<template>
  <li>
    <el-upload
      class="upload-demo"
      accept="image/*"
      action="/api/auth/image"
      :multiple="true"
      :http-request="uploadImage"
      :on-change="handleImageUploadChange"
    >
      <el-tooltip class="item" effect="dark" content="上传图片" placement="right">
        <as-icon name="image" style="color: #777"></as-icon>
      </el-tooltip>
    </el-upload>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component({})
export default class UploadImageTool extends Vue {

  handleImageUploadChange() {}

  uploadImage(uploadObject: any) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e: any) => {
      axios
        .post('/api/auth/image/base64', {
          image: e.target.result
        })
        .then((resp: any) => {
          this.$emit('action', {
            position: 'CURRENT',
            content: `\n[[image-url:/${resp.data.image}]]`
          });
        });
    });

    fileReader.readAsDataURL(uploadObject.file);
  }
}
</script>

<style scoped></style>
