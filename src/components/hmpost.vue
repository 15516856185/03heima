<template>
  <div class="hmpoat">
        <div class="sola-post-img" v-if="post.cover.length < 3">
            <div class="title">
                <div class="conten">{{post.title}}</div>
            <div class="new">
                <span style="margin-right: 10px">{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </div>
            </div>

            <div class="img">
                <img :src="$Url(post.cover[0].url)" alt="">
            </div>
        </div>
        <div class="more-post-img" v-else>
            <div class="title">
                {{post.title}}
            </div>
            <div class="img">
                <img :src="$Url(post.cover[0].url)" alt="">
                <img :src="$Url(post.cover[1].url)" alt="">
                <img :src="$Url(post.cover[2].url)" alt="">
            </div>
             <div class="new">
                <span style="margin-right: 10px">{{post.user.nickname}}</span>
                <span>{{post.comment_length}}跟帖</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
  //   created () {
  //     console.log(this.post)
  //   }

}
</script>

<style lang='less' scoped>
.sola-post-img {
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
.more-post-img {
    border-bottom: 1px solid #ccc;
    padding: 15px;
    .title {
        font-size: 16px;
    }
    .img {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        img {
            width: 112px;
            height: 72px;
            object-fit: cover;
        }
    }
    .new {
            font-size: 14px;
            color: #ccc;
        }
}
</style>
