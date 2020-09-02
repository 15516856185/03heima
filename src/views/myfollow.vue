<template>
  <div class="myfollow">
       <myheader>我的关注</myheader>
       <div class="item" v-for='item in list' :key='item.id'>
           <div class="left">
               <img :src="$base+item.head_img" alt="">
           </div>
           <div class="center">
               <p>{{item.nickname}}</p>
               <p class="time">{{item.create_date|time}}</p>
           </div>
           <div class="right">
              <van-button type="info" round size="small" @click='del(item.id)'>取消关注</van-button>
           </div>
       </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: ''
    }
  },
  methods: {
    async add () {
      const res = await this.$axios.get('/user_follows')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async del (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要删除吗'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast('已取消关注')
        this.add()
      }
    }
  },
  created () {
    this.add()
  }
}
</script>

<style lang='less' scoped>
.item {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    .left {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .center {
     margin-left: 20px;
     font-size: 16px;
      flex: 1;
     .time {
         margin-top: 5px;
         color: #ccc;

     }
    }
}
</style>
