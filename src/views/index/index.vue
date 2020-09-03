<template>
  <div class="index">
      <div class="header">
          <div class="logo">
              <span class="iconfont iconnew"></span>
          </div>
          <div class="search">
             <div class="search-box">
                  <span style="margin-right: 10px" class="iconfont iconsearch"></span>
              <span>搜索新闻</span>
             </div>
          </div>
          <div class="person">
              <span class="iconfont iconwode"></span>
          </div>
      </div>
      <van-tabs v-model="active" animated swipeable @click="onClick">
  <van-tab :title="item.name" v-for='item in list' :key='item.id' >
      <hmpost :post=item v-for='item in newlist' :key='item.id'></hmpost>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      list: [],
      pageIndex: 1,
      pageSize: 10,
      newlist: []
    }
  },
  methods: {

    async add () {
      const res = await this.$axios.get('/category')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // console.log(this.list)
        this.getadd(this.list[0].id)
      }
    },
    async getadd (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newlist = data
        // console.log(this.newlist)
      }
    },
    onClick (name, title) {
    //   this.$toast(title)
    //   console.log(title)
      this.getadd(this.list[name].id)
    }
  },
  created () {
    this.add()
  }

}
</script>

<style lang='less' scoped>
.header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: red;
    color:white;
    .logo,
    .person {
        width: 80px;
        text-align: center;
    }
    .logo {
        span {
            font-size: 50px;
        }
    }
    .person {
        span {
            font-size: 30px;
        }
    }
    .search {
        flex: 1;
        font-size: 16px;
        text-align: center;
        .search-box {
            width: 100%;
            height: 34px;
            background-color: rgba(255, 255, 255, .6);
            line-height: 34px;
            border-radius: 16px;

        }
    }
}
</style>
