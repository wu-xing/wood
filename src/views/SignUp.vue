<template>
  <div class="signup-page">
    <h1>Wood</h1>
    <h2>Sign Up</h2>
    <form v-on:submit="signUp($event);">
      <div class="form-item">
        <label>
          <span>Username</span>
          <el-input v-model="username" name="tnki-username" type="text" placeholder="Username"></el-input>
        </label>
      </div>

      <div class="form-item">
        <label>
          <span>Password</span>
          <el-input v-model="password" name="tnki-password" type="password" placeholder="Password" :minlength="6">
          </el-input>
        </label>
      </div>

      <div class="form-item">
        <label>
          <span>Repeat Confirm</span>
          <el-input
            v-model="confirm"
            name="tnki-password-confirm"
            type="password"
            placeholder="Password Confirm"
            :minlength="6"
          >
          </el-input>
        </label>
      </div>

      <div class="form-item">
        <label>
          <span>Captcha</span>
          <el-input v-model="captcha" name="captcha" type="text" placeholder="Captch" :minlength="6"> </el-input>
          <img class="captcha-image" v-on:click="refreshCaptcha" v-bind:src="data.captchaUrl" alt="验证码" />
        </label>
      </div>

      <div class="button-container"><el-button native-type="submit" type="primary" plain>Sign Up</el-button></div>

      <div class="tip">Already have an account? <router-link to="/signin">Sign In</router-link></div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Provide } from 'vue-property-decorator';
import { Message } from 'element-ui';
import axios, { AxiosResponse } from 'axios';
import router from '@/router';

@Component({
  components: {}
})
export default class SignUp extends Vue {
  public username: string = '';
  public password: string = '';
  public confirm: string = '';
  public captchaId: string = '';
  public captcha: string = '';

  public data = {
    captchaUrl: ''
  };

  created() {
    this.refreshCaptcha();
  }

  public refreshCaptcha() {
    axios.post('/api/captcha').then(resp => {
      this.captchaId = resp.data.id;
      this.data.captchaUrl = '/api/captcha/' + this.captchaId + '.png';
    });
  }

  public async signUp(event: Event) {
    try {
      event.preventDefault();
      if (this.password !== this.confirm) {
        return this.$message.error('Password not match!');
      }
      const resp: AxiosResponse<{}> = await axios.post('/api/v2/signup', {
        username: this.username,
        password: this.password,
        confrim: this.confirm,
        captcha: this.captcha,
        captchaId: this.captchaId
      });

      if (resp && resp.status === 400) {
        return Message.error('Sign up error., please retry');
      }
      Message({
        message: 'Sign up sccuess! Please sign in',
        type: 'success'
      });
      router.push('/signin');
    } catch (error) {
      Message.error('Sign up unknown error.');
    }
  }
}
</script>

<style scoped lang="stylus">
h1, h2 {
  color: #409EFF;
  font-family: "Verdana";
}

h2 {
  margin-top: -1.5rem;
}

form {
  padding: 0 10px;
}

.form-item {
  margin-bottom: 10px;
}

.form-item label {
  display: flex;
  align-items: center;
}

.form-item span {
  display: inline-block;
  width: 110px;
  text-align: left;
  color: #409EFF;
  font-weight: bolder;
}

.button-container {
  margin-top: 10px;
}

.tip {
  margin-top: 10px;
}

.tip a {
  color: #409EFE
}

.captcha-image {
  height: 32px;
}
</style>
