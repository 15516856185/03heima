<template>
  <div class="mycomment">
       <myheader>我的跟帖</myheader>
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
       <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :immediate-check="false"
  offset="10"
  @load="onLoad"
>
      <div class="list" v-for="item in list" :key="item.id">
       <div class="time">{{item.create_date|time('YYYY-MM-DD hh:mm')}}</div>
         <div class="comment-conter" v-if="item.parent">
             <div class="name">回复：{{item.parent.user.nickname}}</div>
             <div class="comment-name">{{item.parent.content}}</div>
         </div>
       <div class="comment">{{item.content}}</div>

       <div class="original">
           <span class="one-txt-cut">原文：{{item.post.title}}</span>
           <span class="iconfont iconjiantou1"></span>
       </div>
      </div>
      </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 6,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async add () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data.data)
      if (res.data.statusCode === 200) {
        this.list = [...res.data.data, ...this.list]
        this.loading = false
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        //   this.loading = true
        }
      }

      this.refreshing = false
    //   console.log(this.list)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.add()
      }, 1000)
    },
    onRefresh () {
      this.pageIndex = 1
      this.list = []
      //   this.loading = true
      //   this.finished = false
      this.add()
    }
  },
  created () {
    this.add()
  }
}
</script>

<style lang='less' scoped>
.list {
    width: 100%;
    // height: 210px;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    font-size: 16px;
    .time {
        color: #ccc;
        margin: 15px 0;
    }
    .comment-conter {
        background-color: #ccc;
        padding: 10px;
        .name {
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
    .comment {
        margin: 15px 0;
    }
    .original {
        color: #ccc;
        display: flex;
        justify-content: space-between;
    }
}
</style>
