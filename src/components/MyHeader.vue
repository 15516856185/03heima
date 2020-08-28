<template>
  <div class='header'>
      <div class="back">
          <span class='iconfont iconjiantou2' @click='back'></span>
      </div>
      <div class="title">
          <slot></slot>
      </div>
      <div class="back"></div>
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

<style lang='less'>
   .header {
       display: flex;
       height: 50px;
       line-height: 50px;
       border-bottom: 1px solid #ccc;
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
