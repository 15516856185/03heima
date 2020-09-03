<template>
 <div>
   <div class="div"></div>
    <div class='header'>
      <div class="back">
          <span class='iconfont iconjiantou2' @click='back'></span>
      </div>
      <div class="title">
          <slot></slot>
      </div>
      <div class="back"></div>
</div>
 </div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.div {
  width: 100%;
  height: 50px;
}
   .header {
     z-index: 999;
     position: fixed;
     width: 100%;
     top: 0;
       display: flex;
       height: 50px;
       line-height: 50px;
       border-bottom: 1px solid #ccc;
       background-color: #fff;
       .back {
           width: 50px;
           padding-left: 20px;
           font-size: 18px;
       }
       .title {
           flex: 1;
           text-align: center;
           font-size: 18px;
           font-weight: 600;
       }
   }
</style>
