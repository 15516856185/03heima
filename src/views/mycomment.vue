<template>
  <div class="mycomment">
       <myheader>我的跟帖</myheader>
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
      const res = await this.$axios.get('/user_comments')
      if (res.data.statusCode === 200) {
        this.list = res.data.data
      }
      console.log(this.list)
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
