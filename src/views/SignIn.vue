<template>
  <div class="signin-page">
    <div class="signin-container">
      <h2><img class="logo" alt="logo" src="/logo.png" /> Sign In</h2>
      <form v-on:submit="signIn($event);">
        <div class="form-item">
          <label>
            <span>Username</span>
            <el-input v-model="username" name="tnki-username" type="text" placeholder="Username"></el-input>
          </label>
        </div>

        <div class="form-item">
          <label>
            <span>Password</span>
            <el-input v-model="password" name="tnki-password" type="password" placeholder="Password"></el-input>
          </label>
        </div>

        <div class="button-container"><el-button native-type="submit" type="primary" plain>Go</el-button></div>

        <div class="tip">Do not have account? <router-link to="/signup">Sign Up</router-link></div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator';
import { Message } from 'element-ui';
import { setJwt, setUserId } from '@/util/auth';
import axios, { AxiosResponse } from 'axios';
import router from '@/router';

@Component({
  components: {}
})
export default class SignIn extends Vue {
  public password: string = '';
  public username: string = '';

  public async signIn(event: Event) {
    event.preventDefault();
    try {
      const response: AxiosResponse<{ token: string; id: string }> = await axios.post('/api/v2/signin', {
        username: this.username,
        password: this.password
      });

      setJwt(response.data.token);
      setUserId(response.data.id);
      Message.success('登录成功');
      window.localStorage.setItem('username-cache', this.username);
      router.push('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return Message.error('Email or Password not match');
      }
      Message.error('Sign In Error');
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: left;
  color: #383838;
}

.logo {
  position: relative;
  top: 5px;
  width: 30px;
  height: 30px;
}

.signin-container {
  position: relative;
  top: 86px;
  width: 400px;
  padding: 20px;
  margin: auto;
  border-radius: 6px;
  border: 1px solid #eee;
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
  color: #383838;
  font-weight: bolder;
}

.tip {
  margin-top: 30px;
}

.tip a {
  color: #383838;
}

.button-container {
  margin-top: 10px;
  text-align: right;
}
</style>
