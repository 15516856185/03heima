<template>
  <div class="edit">
<myheader>编辑资料</myheader>
<div class="img">
    <img :src="$axios.defaults.baseURL+edit.head_img" alt="">
</div>
<navitem @send='showname'>
    <template>昵称</template>
    <template #content>{{edit.nickname}}</template>
</navitem>
<navitem @send='showword'>
    <template>密码</template>
    <template #content>******</template>
</navitem>
<navitem @send='gender'>
    <template>性别</template>
    <template #content>{{edit.gender === 1?'男':'女'}}</template>
</navitem>
<van-dialog v-model="shownickname" title="修改昵称" show-cancel-button @confirm='updatanickname'>
 <van-field v-model="value"  placeholder="请输入用户名" />
</van-dialog>
<van-dialog v-model="showpassword" title="修改密码" show-cancel-button @confirm='apdatapassword'>
 <van-field v-model="password"  placeholder="请输入密码" />
</van-dialog>
<van-dialog v-model="showgender" title="修改性别" show-cancel-button @confirm='updatagender'>
 <van-radio-group v-model="radio">
  <van-cell-group>
    <van-cell title="女" clickable @click="radio = 0">
      <template #right-icon>
        <van-radio :name="0" />
      </template>
    </van-cell>
    <van-cell title="男" clickable @click="radio = 1">
      <template #right-icon>
        <van-radio :name="1" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
</van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      edit: '',
      shownickname: false,
      value: '',
      showpassword: false,
      password: '',
      showgender: false,
      radio: 0
    }
  },
  methods: {
    async add () {
      const id = localStorage.getItem('id')
      const res = await this.$axios.get(`/user/${id}`)
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.edit = data
        // console.log(this.edit)
      }
    },
    showname () {
      this.shownickname = true
      this.value = this.edit.nickname
    },
    async fengzhuang (data) {
      const res = await this.$axios.post(`/user_update/${this.edit.id}`, data)
      //   console.log(res)
      if (res.data.statusCode === 200) {
        this.add()
        this.$toast.success('修改成功')
      }
    },
    updatanickname () {
      this.fengzhuang({ nickname: this.value })
    },
    showword () {
      this.showpassword = true
      this.password = this.edit.password
    },
    apdatapassword () {
      this.fengzhuang({ password: this.password })
    },
    gender () {
      this.showgender = true
      this.radio = this.edit.gender
    },
    updatagender () {
      this.fengzhuang({ gender: this.radio })
    }

  },
  created () {
    this.add()
  }
}
</script>

<style lang='less' scoped>
.img {
    text-align: center;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 30px;
    }
}
/deep/ .van-dialog__content {
    padding: 10px;
    .van-field {
        border: 1px solid #ccc;
    }
}
</style>
