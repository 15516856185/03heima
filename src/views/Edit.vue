<template>
  <div class="edit">
<myheader>编辑资料</myheader>
<div class="img">
    <img :src="$axios.defaults.baseURL+edit.head_img" alt="">
    <van-uploader :after-read="afterRead" />
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
 <van-field v-model="value"  placeholder="请输入用户名" ref='nickname' />
</van-dialog>
<van-dialog v-model="showpassword" title="修改密码" show-cancel-button @confirm='apdatapassword'>
 <van-field v-model="password"  placeholder="请输入密码" ref='password'/>
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
<div class="mask" v-show='maskshow'>
<van-button type="primary" size="small" class="sure" @click="start">确定</van-button>
<van-button type="info" size="small" class="cancel" @click="hidden">取消</van-button>
  <VueCropper
  ref='aa'
  :img="img"
  autoCropWidth='150px'
  autoCropHeight='150px'
  autoCrop
  fixed
  ></VueCropper>
</div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      edit: '',
      shownickname: false,
      value: '',
      showpassword: false,
      password: '',
      showgender: false,
      radio: 0,
      img: '',
      maskshow: false
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
    async showname () {
      this.shownickname = true
      this.value = this.edit.nickname
      await this.$nextTick
      this.$refs.nickname.focus()
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
      if (/^[\u4e00-\u9fa5]{2,6}$/.test(this.value)) {
        this.fengzhuang({ nickname: this.value })
        this.$toast.success('修改成功')
      } else {
        this.$toast('修改失败，昵称长度为2-6个汉字')
      }
    },
    async showword () {
      this.showpassword = true
      this.password = this.edit.password
      await this.$nextTick
      this.$refs.password.focus()
    },
    apdatapassword () {
      if (/^\d{3,6}$/.test(this.password)) {
        this.fengzhuang({ password: this.password })
        this.$toast.success('修改成功')
      } else {
        this.$toast('修改失败，密码长度为3-6位的数字')
      }
    },
    gender () {
      this.showgender = true
      this.radio = this.edit.gender
    },
    updatagender () {
      this.fengzhuang({ gender: this.radio })
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      if (!file.file.name.endsWith('.jpg') || file.file.name.endsWith('.gif') || file.file.name.endsWith('.png') || file.file.name.endsWith('.jpeg')) {
        return this.$toast('请上传符合标准图片')
      }
      if (file.file.size >= 20 * 1024) {
        return this.$toast('图片太大，请上传20KB以下大小图片')
      }
      this.maskshow = true
      this.img = file.content
      // this.img = file.content
    },
    hidden () {
      this.maskshow = false
    },
    async start () {
      this.$refs.aa.getCropBlob(async (bold) => {
        const Data = new FormData()
        Data.append('file', bold)
        const res = await this.$axios.post('/upload', Data)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.fengzhuang({
            head_img: data.url
          })
        }
      })
      this.maskshow = false
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
.van-uploader {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}
 /deep/ .van-uploader__input {
  width: 100px;
  height: 100px;
  }
  .mask {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .cancel, .sure {
    z-index: 1;
    position: fixed;
    top: 0;
  }
  .cancel {
    right: 0;
  }
</style>
