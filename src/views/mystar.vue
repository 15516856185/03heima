<template>
  <div class="mystar">
        <myheader>我的收藏</myheader>
        <div class="item" v-for='item in list' :key='item.id'>
            <div class="title">
                <div class="conten">{{item.title}}</div>
            <div class="new">
                <span style="margin-right: 10px">{{item.user.nickname}}</span>
                <span>{{item.comments.length}}跟帖</span>
            </div>
            </div>

            <div class="img">
                <img :src="$Url(item.cover[0].url)" alt="">
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {

    async add () {
      const res = await this.$axios.get('/user_star')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
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
    border-bottom: 1px solid #ccc;
    padding: 15px;
    .title {
        flex: 1;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .new {
            font-size: 14px;
            color: #ccc;
        }
    }
    .img {
        img {
            width: 126px;
            height: 76px;
            object-fit: cover;

        }
    }
}
</style>
