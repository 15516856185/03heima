<template>
  <div>
      <myheader>注册</myheader>
      <logo></logo>
         <van-form @submit="regirest">
  <van-field
    v-model="username"
    label="用户名"
    placeholder="请注册用户名"
    :rules="rules.username"
  />
  <van-field
    v-model="nickname"
    label="昵称"
    placeholder="请注册昵称"
    :rules="rules.nickname"
  />
    <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请注册密码"
    :rules="rules.password"
  />
  <div style="margin: 16px;">
    <van-button round block type="danger" native-type="submit">
      注册
    </van-button>
  </div>
  <p class="p">已有账号！点击<router-link to='/login'>登录</router-link></p>
</van-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '请输入5-11位的数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,6}$/, message: '请输入3-6位的数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称长度位2-6个汉字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async regirest () {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang = 'less' scoped>
 .p{
     float: right;
     font-size: 14px;
     padding: 10px;
     a {
         color: blue;
     }
 }
</style>
