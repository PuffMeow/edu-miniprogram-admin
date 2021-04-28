<template>
  <div class="login-container">
    <el-card class="login-card" header="后台管理系统">
      <el-form @submit.native.prevent="login">
        <el-form-item label="账号">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-button native-type="submit" type="primary">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/service/api'
import { message } from '../utils/utils'
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        message('error', '账号或密码不能为空')
        return
      }

      try {
        const res = await login(this.username, this.password)
        console.log(res)
        localStorage.username = res.data.data.userName
        this.$router.replace('/')
        message('success', '登录成功')
      } catch (err) {
        console.log(err)
        message('error', '好像网络出了点问题？？？')
      }
    },
  },
}
</script>

<style>
.login-card {
  width: 25rem;
  margin: 7rem auto;
}
</style>
