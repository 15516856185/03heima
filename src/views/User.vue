<template>
  <div class="user">
      <div class="header"  @click="$router.push('/edit')">
          <div class="left">
              <img :src="base+user.head_img" alt="">
          </div>
          <div class="center">
              <div class="top">
                  <span v-if='user.gender === 1' class='iconfont iconxingbienan'></span>
                  <span v-else class='iconfont iconxingbienv'></span>
                  <span class="two">{{user.nickname}}</span>
              </div>
              <div class="time">
                 {{user.create_date|time}}
              </div>
          </div>
          <div class="right">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
      <navitem to='/my-fllow'>
          <template >我的关注</template>
          <template #content>关注的用户</template>
      </navitem>
      <navitem>
          <template>我的跟帖</template>
          <template #content>跟帖/回复</template>
      </navitem>
      <navitem>
          <template>我的收藏</template>
          <template #content>文章/视频</template>
      </navitem>
      <navitem to='/edit'>
          <template >设置</template>
      </navitem>
     <div class="butt">
      <van-button type="primary" block @click='show'>退出</van-button>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  },
  async created () {
    const id = localStorage.getItem('id')
    // const token = localStorage.getItem('token')
    // console.log(id)
    // console.log(token)
    const res = await this.$axios.get(`/user/${id}`)
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    //   console.log(this.user)
    }
  },
  methods: {
    async show () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定取消吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        this.$router.push('/login')
        this.$toast('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.header {
    height: 130px;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 3px solid #ccc;
    .left {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .center {
        flex: 1;
        font-size: 16px;
        margin-left: 15px;
         .time {
          margin-top: 7px;
          color: #ccc;
      }
      .two {
          margin-left: 5px;
      }
      .iconxingbienan {
          color: blue;
      }
    }
    .right {
        color: #ccc;
       .iconjiantou1{
          font-size: 20px;
       }
    }

}
.butt {
    margin: 20px;
 }
</style>
