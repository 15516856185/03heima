<template>
  <div>
      <myheader>登录</myheader>
      <logo></logo>
      <van-form @submit="login">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="请输入用户名"
    :rules="rules.username"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="请输入密码"
    :rules="rules.password"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
  <p class="p">没有账号？点击<router-link to='/regirest'>注册</router-link></p>
</van-form>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.$route.params)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '请输入5-11位的数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,6}$/, message: '请输入3-6位的数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      // console.log(res.data)
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/user')
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.user.id)
      } else {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .p{
     float: right;
     font-size: 14px;
     padding: 10px;
     a {
         color: blue;
     }
 }
</style>
